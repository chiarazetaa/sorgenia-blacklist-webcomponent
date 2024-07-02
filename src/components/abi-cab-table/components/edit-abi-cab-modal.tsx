import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { MODAL_EVENTS } from '../../../utils/utils';
import { hideModal, modalExitLoading, modalLoading } from '../../../services/modal-service';
import { showSnackbar } from '../../../services/snackbar-service';
import { AbiCabApi } from '../../../api/AbiCabApi';

@Component({
  tag: 'edit-abi-cab-modal',
  shadow: false,
})
export class EditAbiCabModal {
  @Prop() api: AbiCabApi;
  @Prop() documentIds: any[];
  @State() formattedDate: string;

  @State() template: EditModalTemplateAbiCab = {};

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case MODAL_EVENTS.SAVE_EDIT:
        this.massiveDateUpdate();
        break;
    }
  }

  componentWillLoad() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    this.formattedDate = new Intl.DateTimeFormat('it-IT', options).format(today);
    const [day, month, year] = this.formattedDate.split('/');
    this.template.data_cancellazione = `${year}-${month}-${day}`;
  }

  async massiveDateUpdate() {
    modalLoading();
    try {
      console.log(this.documentIds);
      const payload = {
        document_ids: this.documentIds,
        data_cancellazione: this.template.data_cancellazione,
      };
      await this.api.bulkUpdateAbiCab(payload);
      hideModal();
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.message || 'Error')
    } finally {
      modalExitLoading();
    }
  };

  render() {
    return <Host>
      <b2w-date-picker
        label="Data"
        locale="it"
        value={this.formattedDate}
        mindate={this.formattedDate}
        format="dd/MM/yyyy"
        onB2wDatePickerEvent={e => {
          this.template.data_cancellazione = e.detail.value;
        }}
      />
    </Host>;
  }
}


export interface EditModalTemplateAbiCab {
  data_cancellazione?: string;
}
