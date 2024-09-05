import { showSnackbar } from '../services/snackbar-service';

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

export const handleError = (error:any) => {
  let message = "Errore generico"
  try{
    message = JSON.parse(error?.message)?.detail
  }catch(e){} finally {
    showSnackbar( message);
  }
}


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
    .B2wTable .tabulator .tabulator-header {margin-bottom: 5px !important; font-weight: bold !important} .color-type-1 { color: #34a1eb !important} .color-type-2 { color: #1a2eb8 !important}
    .boolean-dots.dot-red{border-radius:100%; span {border: 1px solid lightgray !important; background-color: transparent !important} }
    .boolean-dots.dot-green{border-radius:100%; span {border: 1px solid transparent !important;} }
    .boolean-dots span {box-shadow:none !important}
    .B2wTable .tabulator-row {padding:2px !important}

   `

export const getReadableDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const MAIN_BUTTONS_STYLES= `.B2wButton{font-size: 0.75rem !important; padding:10px 15px !important; border:none !important; .button-text{color:black !important &:disabled{color:grey !important;}}}`
