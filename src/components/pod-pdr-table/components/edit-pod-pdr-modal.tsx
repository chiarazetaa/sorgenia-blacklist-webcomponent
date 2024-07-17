import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { PodPdrApi } from '../../../api/PodPdrApi';
import { MODAL_EVENTS } from '../../../utils/utils';
import {
  hideModalAndRefreshData, modalDisable,
  modalExitDisable,
  modalExitLoading,
  modalLoading,
} from '../../../services/modal-service';
import { showSnackbar } from '../../../services/snackbar-service';

@Component({
  tag: 'edit-pod-pdr-modal',
  shadow: false,
})
export class EditPodPdrModal {
  @Prop() api: PodPdrApi;
  @Prop() documentIds: any[];
  @State() formattedDate: string;

  @State() template: EditModalTemplatePodPdr = {};

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case MODAL_EVENTS.SAVE_EDIT:
        this.massiveDateUpdate();
        break;
    }
  }

  componentWillLoad() {
    this.checkFormValidity();
  }

  checkFormValidity() {
    if(this.template.data_cancellazione) {
      modalExitDisable();
    } else modalDisable();
  }

  async massiveDateUpdate() {
    modalLoading();
    try {
      const payload = {
        document_ids: this.documentIds,
        data_cancellazione: this.template.data_cancellazione,
      };
      await this.api.bulkUpdatePodPdr(payload);
      hideModalAndRefreshData();
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error')
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
          this.checkFormValidity()
        }}
      />
    </Host>;
  }
}

export interface EditModalTemplatePodPdr {
  data_cancellazione?: string;
}
