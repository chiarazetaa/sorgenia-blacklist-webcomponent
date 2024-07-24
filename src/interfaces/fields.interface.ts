export type FilterFieldString = {
  text: string;
  value: string;
  placeholder: string;
  type: "string";
}

export type FilterFieldNumber = {
  text: string;
  value: string;
  placeholder: string;
  type: "number";
}

export type FilterFieldBoolean = {
  text: string;
  value: string;
  type: "boolean";
}

export type FilterFieldPicklist = {
  text: string;
  value: string;
  placeholder: string;
  type: "picklist";
  picklistvalues: { text: string, value: string | boolean | number }[];
}

export type FilterFieldDate = {
  text: string;
  value: string;
  placeholder: string;
  type: "date";
  datevalue?: {
    labelstart?: string
    labelend?: string
    dateFormat?: string
    dateOutputFormat?: string
    maxdate?: string
  }
}

export type TableField = {
  title: string
  field: string
  headerSort?: boolean
  formatter?: string,
  hozAlign?: 'left' | 'right',
  frozen?: boolean,
  visible?: boolean,
  emitEventOnSorting?: boolean,
  formatterParams?: any,
}
