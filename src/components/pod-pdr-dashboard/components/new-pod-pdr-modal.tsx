import { debounce, MODAL_EVENTS } from '../../../utils/utils';
import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { PodPdrApi } from '../../../api/PodPdrApi';
import {
  hideModalAndRefreshData,
  modalDisable,
  modalExitDisable,
  modalExitLoading,
  modalLoading,
} from '../../../services/modal-service';
import { showSnackbar } from '../../../services/snackbar-service';

@Component({
  tag: 'new-pod-pdr-modal',
  shadow: false,
})
export class NewPodPdrModal {
  @Prop() api: PodPdrApi;
  @State() formattedDate: string;
  @State() template: NewModalTemplatePodPdr = {};
  @State() customerName: string
  @State() customerFiscalCode: string
  @State() loadingCustomerData: boolean = false;

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case MODAL_EVENTS.SAVE_NEW:
        this.addPodPdrInBlacklist();
        break;
    }
  }

  componentWillLoad() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    this.formattedDate = new Intl.DateTimeFormat('it-IT', options).format(today);
    const [day, month, year] = this.formattedDate.split('/');
    this.template.data_inserimento = `${year}-${month}-${day}`;
    this.template.type = 'pod';
    this.checkFormValidity();
  }

  searchCodiceCliente = async (codiceCliente: string) => {
    try {
      this.loadingCustomerData = true;
      const rawResult = await this.api.searchCodiceCliente(codiceCliente);
      this.customerName = rawResult.response.display_name;
      this.customerFiscalCode = rawResult.response.fiscal_code;
    } catch (e) {
      this.customerName = 'Nessun cliente trovato per questo codice';
      this.customerFiscalCode = undefined;
    }
    finally {
      this.loadingCustomerData = false;
    }
  };

  checkFormValidity() {
    if(this.template.type && this.template.data_inserimento && this.template.code && this.template.codice_cliente) {
      modalExitDisable();
    } else modalDisable();
  }

  async addPodPdrInBlacklist() {
    modalLoading();
    try {
      await this.api.addPodPdrInBlacklist(this.template);
      hideModalAndRefreshData();
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    } finally {
      modalExitLoading();
    }
  }

  render() {
    return <Host>
      <b2w-radio-button label="Tipologia codice POD/PDR" style={{ 'margin-bottom': '1rem' }} value="pod"
                        payload={JSON.stringify([{ text: 'POD', value: 'pod' }, { text: 'PDR', value: 'pdr' }])}
                        onB2wRadioButtonEvent={e => {
                          this.template.type = e.detail.value;
                          this.checkFormValidity();
                        }}></b2w-radio-button>
      <b2w-input-text label="Codice POD/PDR" style={{ 'margin-bottom': '1rem' }} onB2wInputEvent={e => {
        this.template.code = e.detail.value;
        this.checkFormValidity();
      }} />
      <div style={{ 'margin-bottom': '1rem' }}>
        <b2w-input-text label="Codice cliente"
                        onB2wInputEvent={e => {
                          debounce(this.searchCodiceCliente(e.detail.value), 1000);
                          this.template.codice_cliente = e.detail.value;
                          this.checkFormValidity();
                        }} />
        {this.loadingCustomerData ? <b2w-spinner style={{ 'margin-top': '1rem' }} type="small" visible="true" fixed="false"></b2w-spinner> : <div>
          <p>{this.customerName} {this.customerFiscalCode ? "- " + this.customerFiscalCode : ""}</p>
        </div>}

      </div>
      <b2w-date-picker
        label="Data inserimento"
        locale="it"
        value={this.formattedDate}
        mindate={this.formattedDate}
        format="dd/MM/yyyy"
        onB2wDatePickerEvent={e => {
          this.template.data_inserimento = e.detail.value;
          this.checkFormValidity();
        }}
      />
    </Host>
  }
}

export interface NewModalTemplatePodPdr {
  code?: string;
  type?: 'pod' | 'pdr';
  codice_cliente?: string;
  data_inserimento?: string;
}

export interface CustomerSearchResult {
  displayName?: string;
  fiscalCode?: string;
}
