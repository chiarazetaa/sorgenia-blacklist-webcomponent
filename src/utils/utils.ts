export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args); // Use apply to preserve the context and pass arguments
    }, wait);
  };
};

export const MODAL_EVENTS = {
  ID: 'modalEvent',
  SHOW: 'show',
  HIDE: 'hide',
  SAVE_EDIT_DATE: 'saveEditDate',
  SAVE_NEW_ABI_CAB: 'saveNewAbiCab',
  EXIT_LOADING: 'exitLoading',
  LOADING: 'loading',
};

export const SNACKBAR_EVENTS = {
  ID: 'snackbarEvent',
  SHOW: 'show',
};
