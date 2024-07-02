import { HTMLStencilElement } from '@stencil/core/internal';
import { MODAL_EVENTS } from '../utils/utils';

export const openModal = (component: HTMLStencilElement, eventNameOnSave:string, title: string) => {
  window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, {
    detail: {
      component: component,
      type: MODAL_EVENTS.SHOW,
      eventNameOnSave: eventNameOnSave,
      modalTitle: title,
    },
  }));
};

export const  hideModal = () => {
  window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, {
    detail: {
      type: MODAL_EVENTS.HIDE,
    },
  }));
};

export const  modalLoading = () => {
  window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, {
    detail: {
      type: MODAL_EVENTS.LOADING,
    },
  }));
};

export const  modalExitLoading = () => {
  window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, {
    detail: {
      type: MODAL_EVENTS.EXIT_LOADING,
    },
  }));
};
