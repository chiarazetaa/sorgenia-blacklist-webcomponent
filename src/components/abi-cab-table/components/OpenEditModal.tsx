import { MODAL_EVENTS } from '../../../utils/utils';
import { h } from '@stencil/core';

export const openEditModal = (editModalTemplate: EditModalTemplate) => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('it-IT', options).format(today);
  const [day, month, year] = formattedDate.split('/');
  editModalTemplate.data_cancellazione = `${year}-${month}-${day}`;
  const jsxElement = <div>
    <b2w-date-picker
      label="Data"
      locale="it"
      value={formattedDate}
      mindate={formattedDate}
      format="dd/MM/yyyy"
      onB2wDatePickerEvent={e => {
        editModalTemplate.data_cancellazione = e.detail.value;
      }}
    />
  </div>;
  window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, {
    detail: {
      component: jsxElement,
      type: MODAL_EVENTS.SHOW,
      eventNameOnSave: MODAL_EVENTS.SAVE_EDIT_DATE,
      modalTitle: 'Modifica data cancellazione',
    },
  }));
};

export interface EditModalTemplate {
  data_cancellazione?: string;
}
