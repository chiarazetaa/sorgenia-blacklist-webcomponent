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
  DISABLE: 'disable',
  EXIT_DISABLE: 'exitDisable',
  HIDE_AND_REFRESH: 'hideAndRefresh',
  SAVE_EDIT: 'saveEditDate',
  SAVE_NEW: 'saveNew',
  EXIT_LOADING: 'exitLoading',
  LOADING: 'loading',
} as const;

export type ModalEvents = typeof MODAL_EVENTS[keyof typeof MODAL_EVENTS]

export const INTERNAL_EVENTS = {
  REFRESH_DATA: 'refresh',
} as const

export type InternalEvents = typeof INTERNAL_EVENTS[keyof typeof INTERNAL_EVENTS]

export const SNACKBAR_EVENTS = {
  ID: 'snackbarEvent',
  SHOW: 'show',
} as const;

export type SnackbarEvents = typeof SNACKBAR_EVENTS[keyof typeof SNACKBAR_EVENTS]

export const TABLE_STYLES= `
    .B2wTable .tabulator .tabulator-header {margin-bottom: 5px !important; font-weight: bold !important}
   `
