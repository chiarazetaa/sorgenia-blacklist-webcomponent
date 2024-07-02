import { MODAL_EVENTS } from '../../../utils/utils';
import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { hideModal, modalExitLoading, modalLoading } from '../../../services/modal-service';
import { showSnackbar } from '../../../services/snackbar-service';
import { AbiCabApi } from '../../../api/AbiCabApi';

@Component({
  tag: 'new-abi-cab-modal',
  shadow: false,
})
export class NewAbiCabModal {
  @Prop() api: AbiCabApi;
  @State() formattedDate: string;
  @State() template: NewModalTemplateAbiCab = {};

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case MODAL_EVENTS.SAVE_NEW:
        this.addAbiCabInBlacklist();
        break;
    }
  }

  componentWillLoad() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    this.formattedDate = new Intl.DateTimeFormat('it-IT', options).format(today);
    const [day, month, year] = this.formattedDate.split('/');
    this.template.data_inserimento = `${year}-${month}-${day}`;
    this.template.type = 'abi';
  }

  async addAbiCabInBlacklist() {
    modalLoading();
    try {
      await this.api.addAbiCabInBlacklist(this.template);
      hideModal();
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.message || 'Error');
    } finally {
      modalExitLoading();
    }
  }

  render() {
    return <Host>
      <b2w-radio-button label="Tipologia codice ABI/CAB" style={{ 'margin-bottom': '1rem' }} value="pod"
                        payload={JSON.stringify([{ text: 'ABI', value: 'abi' }, { text: 'CAB', value: 'cab' }])}
                        onB2wRadioButtonEvent={e => {
                          this.template.type = e.detail.value;
                        }}></b2w-radio-button>
      <b2w-input-text label="Codice ABI/CAB" style={{ 'margin-bottom': '1rem' }} onB2wInputEvent={e => {
        this.template.code = e.detail.value;
      }} />
      <b2w-date-picker
        label="Data inserimento"
        locale="it"
        value={this.formattedDate}
        mindate={this.formattedDate}
        format="dd/MM/yyyy"
        onB2wDatePickerEvent={e => {
          this.template.data_inserimento = e.detail.value;
        }}
      />
    </Host>
  }
}

export interface NewModalTemplateAbiCab {
  code?: string;
  type?: 'abi' | 'cab';
  data_inserimento?: string;
}
