import { MODAL_EVENTS } from '../../../utils/utils';
import { h } from '@stencil/core';

export const openNewModal = (newModalTemplate: NewModalTemplate) => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('it-IT', options).format(today);
  const [day, month, year] = formattedDate.split('/');
  newModalTemplate.data_inserimento = `${year}-${month}-${day}`;
  const jsxElement = <div>
    <b2w-input-text label="ABI" onB2wInputEvent={e => { newModalTemplate.abi = e.detail.value; }}/>
    <b2w-input-text label="CAB" onB2wInputEvent={e => { newModalTemplate.cab = e.detail.value; }}/>
    <b2w-date-picker
      label="Data inserimento"
      locale="it"
      value={formattedDate}
      mindate={formattedDate}
      format="dd/MM/yyyy"
      onB2wDatePickerEvent={e => {
        newModalTemplate.data_inserimento = e.detail.value;
      }}
    />
  </div>;
  window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, {
    detail: {
      component: jsxElement,
      type: MODAL_EVENTS.SHOW,
      eventNameOnSave: MODAL_EVENTS.SAVE_NEW_ABI_CAB,
      modalTitle: 'Aggiungi ABI/CAB in Blacklist',
    },
  }));
};

export interface NewModalTemplate {
  abi?:string;
  cab?:string;
  data_inserimento?: string;
}
