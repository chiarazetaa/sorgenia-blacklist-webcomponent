import { handleError, MODAL_EVENTS } from '../../../utils/utils';
import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import {
  hideModalAndRefreshData,
  modalDisable,
  modalExitDisable,
  modalExitLoading,
  modalLoading,
} from '../../../services/modal-service';
import { showSnackbar } from '../../../services/snackbar-service';
import { ClientiApi } from '../../../api/ClientiApi';

@Component({
  tag: 'add-customer-modal',
  shadow: false,
})
export class AddCustomerModal {
  @Prop() api: ClientiApi;
  @Prop() crmId:string;
  @State() formattedDate: string;
  @State() template: NewModalTemplateCustomer = {};
  @State() additionalCustomerData: CustomerSearchResult;
  @State() loadingCustomerData = false;

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case MODAL_EVENTS.SAVE_NEW:
        this.addCustomerInBlacklist();
        break;
    }
  }

  componentWillLoad() {
    this.checkFormValidity();
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    this.formattedDate = new Intl.DateTimeFormat('it-IT', options).format(today);
    const [day, month, year] = this.formattedDate.split('/');
    this.template.data_inserimento = `${year}-${month}-${day}`;
    this.searchAdditionalCustomerData()
  }

  searchAdditionalCustomerData = async () => {
    this.template.codice_cliente = null;
    try {
      this.loadingCustomerData = true;
      const rawResult = await this.api.getAdditionalCustomerData(this.crmId);
      const { display_name, fiscal_code, vat, user_sequence } = rawResult.response;
      this.template.codice_cliente = user_sequence;
      this.additionalCustomerData = { displayName: display_name, fiscalCode: fiscal_code, vat };
    } catch (e) {
      handleError(e);
    }
    finally {
      this.loadingCustomerData = false;
      this.checkFormValidity();
    }
  };

  checkFormValidity() {
    if(this.template.data_inserimento && this.template.codice_cliente) {
      modalExitDisable();
    } else modalDisable();
  }

  async addCustomerInBlacklist() {
    modalLoading();
    try {
      await this.api.addCustomerInBlacklist({...this.template, causale: "COND_terminated_defaulted"});
      hideModalAndRefreshData();
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    } finally {
      modalExitLoading();
    }
  }

  render() {
    return <Host>
      <div style={{ 'margin-bottom': '1rem' }}>
        {this.loadingCustomerData ?
          <b2w-spinner style={{ 'margin-top': '1rem' }} type="small" visible="true" fixed="false"></b2w-spinner> : <div>
            {this.additionalCustomerData && <p><b>Cliente: </b>{this.additionalCustomerData?.displayName} - <b>C.F</b> {this.additionalCustomerData.fiscalCode} - <b>P.IVA</b> {this.additionalCustomerData.vat || 'N/A'}</p>}
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

export interface NewModalTemplateCustomer {
  data_inserimento?: string;
  codice_cliente?: string;
}

export interface CustomerSearchResult {
  displayName?: string;
  fiscalCode?: string;
  vat?: string;
}
