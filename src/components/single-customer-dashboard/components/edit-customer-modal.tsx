import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { handleError, MODAL_EVENTS } from '../../../utils/utils';
import {
  hideModalAndRefreshData, modalDisable,
  modalExitDisable,
  modalExitLoading,
  modalLoading,
} from '../../../services/modal-service';
import { ClientiApi } from '../../../api/ClientiApi';
import { CustomerRow } from '../single-customer-dashboard';

@Component({
  tag: 'edit-customer-modal',
  shadow: false,
})
export class EditCustomerModal {
  @Prop() api: ClientiApi;
  @Prop() customerBlacklistRow: CustomerRow;
  @State() formattedDateCancellazione: string;
  @State() formattedDateInserimento: string;

  @State() template: EditModalTemplateClienti = {};

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case MODAL_EVENTS.SAVE_EDIT:
        this.customerUpdate();
        break;
    }
  }

  componentWillLoad() {
    this.formattedDateInserimento = this.convertDate(this.customerBlacklistRow.data_inserimento);
    const [day, month, year] = this.formattedDateInserimento.split('/');
    this.template.data_inserimento = `${year}-${month}-${day}`;
    if (this.customerBlacklistRow.data_cancellazione) {
      this.formattedDateCancellazione = this.convertDate(this.customerBlacklistRow.data_cancellazione);
      const [day, month, year] = this.formattedDateCancellazione.split('/');
      this.template.data_cancellazione = `${year}-${month}-${day}`;
    }
    if (this.customerBlacklistRow.causale) {
      this.template.causale = this.customerBlacklistRow.causale;
    }
    this.checkFormValidity();
  }

  convertDate(stringDate: string) {
    const date = new Date(stringDate);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('it-IT', options).format(date);
  }

  checkFormValidity() {
    if (this.customerBlacklistRow.tipo_inserimento === 'manuale') {
      if (this.template.data_cancellazione && this.template.causale) {
        modalExitDisable();
      } else modalDisable();
    }
    if (this.template.data_cancellazione) {
      modalExitDisable();
    } else modalDisable();
  }

  async customerUpdate() {
    modalLoading();
    try {
      const payload = {
        data_cancellazione: this.template.data_cancellazione,
      };
      if (this.template.data_inserimento) {
        payload['data_inserimento'] = this.template.data_inserimento;
      }
      if (this.template.causale) {
        payload['causale'] = this.template.causale;
      }
      await this.api.editCustomerBlacklist(this.customerBlacklistRow._id, payload);
      hideModalAndRefreshData();
    } catch (e) {
      handleError(e);
    } finally {
      modalExitLoading();
    }
  };

  render() {
    return <Host>
      {this.customerBlacklistRow.tipo_inserimento === 'manuale' && <div>
        <b2w-input-text value={this.customerBlacklistRow.causale} label="Causale" style={{ 'margin-bottom': '1rem' }}
                        onB2wInputEvent={e => {
                          this.template.causale = e.detail.value;
                          this.checkFormValidity();
                        }} />
        <b2w-date-picker
          style={{ 'margin-bottom': '1rem' }}
          label="Data inserimento"
          locale="it"
          value={this.formattedDateInserimento}
          mindate={this.formattedDateInserimento}
          format="dd/MM/yyyy"
          onB2wDatePickerEvent={e => {
            this.template.data_inserimento = e.detail.value;
            this.checkFormValidity();
          }}
        />
      </div>}
      <b2w-date-picker
        label="Data cancellazione"
        locale="it"
        value={this.formattedDateCancellazione}
        mindate={new Date().toISOString().split('T')[0]}
        format="dd/MM/yyyy"
        onB2wDatePickerEvent={e => {
          this.template.data_cancellazione = e.detail.value;
          this.checkFormValidity();
        }}
      />
    </Host>;
  }
}

export interface EditModalTemplateClienti {
  data_cancellazione?: string;
  data_inserimento?: string;
  causale?: string;
}
