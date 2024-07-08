import { HTMLStencilElement } from '@stencil/core/internal';
import { MODAL_EVENTS } from '../utils/utils';

export const openModal = (component: HTMLStencilElement, eventNameOnSave:string, title: string, confirmButtonText?:string, cancelButtonText?:string) => {
  window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, {
    detail: {
      component: component,
      type: MODAL_EVENTS.SHOW,
      eventNameOnSave: eventNameOnSave,
      modalTitle: title,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    },
  }));
};

export const hideModal = () => {
  window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, {
    detail: {
      type: MODAL_EVENTS.HIDE,
    },
  }));
};

export const hideModalAndRefreshData = () => {
  window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, {
    detail: {
      type: MODAL_EVENTS.HIDE_AND_REFRESH,
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
