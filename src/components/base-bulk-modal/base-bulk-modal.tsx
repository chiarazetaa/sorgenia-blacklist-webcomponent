import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import { PodPdrApi } from '../../api/PodPdrApi';
import { MODAL_EVENTS } from '../../utils/utils';
import {
  hideModalAndRefreshData,
  modalDisable,
  modalExitDisable,
  modalExitLoading,
  modalLoading,
} from '../../services/modal-service';
import { showSnackbar } from '../../services/snackbar-service';
import { AbiCabApi } from '../../api/AbiCabApi';
import { ClientiApi } from '../../api/ClientiApi';

@Component({
  tag: 'base-bulk-modal',
  styleUrl: 'base-bulk-modal.css',
  shadow: false,
})
export class BaseBulkModal {

  @Prop() api: PodPdrApi | AbiCabApi | ClientiApi;
  @State() file: File

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case MODAL_EVENTS.SAVE_NEW:
        this.uploadCsv();
        break;
    }
  }

  async uploadCsv() {
    modalLoading();
    try {
      await this.api.uploadTemplateAndDownloadResult(this.file);
      hideModalAndRefreshData();
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.message || 'Error');
    } finally {
      modalExitLoading();
    }
  }

  componentWillLoad() {
    modalDisable();
  }

  handleCsvUpload(e) {
    this.file = e.detail.file;
    modalExitDisable();
  }

  downloadTemplate() {
    this.api.downloadTemplate();
  }

  render() {
    return <Host>
      <div style={{ 'margin-bottom': '1rem' }}>
        <b2w-button onB2wButtonClick={() => this.downloadTemplate()} type="icon-secondary"
                    iconName="download"
                    custom-style=".B2wButton{width: 200px !important;margin-right:1rem;} "
                    text="Download template"></b2w-button>
        <b2w-input-file
          custom-style=".B2wInputFile{} "
          fieldApiName={'uploadCsv'}
          hintText={"Carica il file csv"}
          fileUploadedLabel={"File caricato"}
          onB2wUploadEvent={e => this.handleCsvUpload(e)}
          uniqueId={'uploadCsv'}
          selectMultipleFiles={false}
        />
        {this.file && <p>File selezionato: <b>{this.file.name}</b></p>}
      </div>
    </Host>
  }

}
