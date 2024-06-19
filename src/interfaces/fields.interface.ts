export type FilterField = {
  text: string;
  value: string;
  placeholder: string;
  type: string;
}

export type TableField = {
  title: string
  field: string
  headerSort: boolean
  formatter: string,
  hozAlign?: 'left' | 'right',
  frozen?: boolean,
  visible?: boolean,
  emitEventOnSorting?: boolean,
  formatterParams?: any,
}
