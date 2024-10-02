import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { PodPdrApi } from '../../../api/PodPdrApi';
import { handleError, MODAL_EVENTS } from '../../../utils/utils';
import {
  hideModalAndRefreshData,
  modalDisable,
  modalExitDisable,
  modalExitLoading,
  modalLoading,
} from '../../../services/modal-service';

@Component({
  tag: 'bulk-pod-pdr-modal',
  shadow: false,
})
export class BulkPodPdrModal {
  @Prop() api: PodPdrApi
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
      handleError(e);
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
        <p>Nota: Al termine del caricamento viene restituito un file con le eventuali righe contenenti errori.</p>
        <p>Attenzione: Alcuni programmi di apertura del csv potrebbero manipolare il contenuto del template scaricato: accertarsi che il separatore sia sempre una virgola (,) e che il testo non includa doppi apici </p>
      </div>
    </Host>
  }

}
