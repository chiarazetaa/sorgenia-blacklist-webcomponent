import { SNACKBAR_EVENTS } from '../utils/utils';

export const showSnackbar = (text: string) => {
  window.dispatchEvent(new CustomEvent(SNACKBAR_EVENTS.ID, {
    detail: {
      type: SNACKBAR_EVENTS.SHOW,
      text,
    },
  }));
};

export const hideSnackbar = () => {
  window.dispatchEvent(new CustomEvent(SNACKBAR_EVENTS.ID, {
    detail: {
      type: SNACKBAR_EVENTS,
    },
  }));
};
