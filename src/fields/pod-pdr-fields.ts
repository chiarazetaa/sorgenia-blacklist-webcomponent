import {
  FilterFieldBoolean, FilterFieldDate,
  FilterFieldPicklist,
  FilterFieldString,
  TableField,
} from '../interfaces/fields.interface';

export const podPdrFields: ((FilterFieldString | FilterFieldBoolean | FilterFieldPicklist | FilterFieldDate) & TableField)[] = [
  {
    text: 'ID',
    value: '_id',
    placeholder: 'ID',
    type: 'string',
    title: 'ID',
    field: '_id',
    headerSort: false,
    formatter: 'fonts',
    visible: false,
    emitEventOnSorting: true,
  },
  {
    text: 'Codice',
    value: 'code',
    placeholder: 'Code',
    type: 'string',
    title: 'Codice',
    field: 'code',
    headerSort: true,
    formatter: 'fonts',
    visible: true,
    emitEventOnSorting: true
  },
  {
    text: 'Tipo',
    value: 'type',
    placeholder: 'Tipo',
    type: 'picklist',
    title: 'Tipo',
    picklistvalues: [{ text: 'POD', value: 'pod' }, { text: 'PDR', value: 'pdr' }],
    field: 'type',
    headerSort: true,
    formatter: 'fonts',
    formatterParams: {
      className: 'table-info bold uppercase color-tertiary',
      color: { 'pod': 'color-accent2', 'pdr': 'color-success' },
    },
    visible: true,
    emitEventOnSorting: true,
  },
  {
    text: 'Data inserimento',
    value: 'data_inserimento',
    placeholder: 'Data inserimento',
    type: 'string',
    title: 'Data inserimento',
    field: 'data_inserimento',
    headerSort: true,
    formatter: 'datetime',
    visible: true,
    emitEventOnSorting: true,
    formatterParams: {
      inputFormat: 'yyyy-MM-dd',
      outputFormat: 'dd/MM/yyyy',
      invalidPlaceholder: '-',
      timezone: 'Europe/Rome',
    },
  },
  {
    text: 'Data cancellazione',
    value: 'data_cancellazione',
    placeholder: 'Data cancellazione',
    type: 'date',
    title: 'Data cancellazione',
    field: 'data_cancellazione',
    headerSort: true,
    formatter: 'datetime',
    visible: true,
    emitEventOnSorting: true,
    formatterParams: {
      inputFormat: 'yyyy-MM-dd',
      outputFormat: 'dd/MM/yyyy',
      invalidPlaceholder: '',
      timezone: 'Europe/Rome',
    },
  },
  {
    text: 'Operatore forzatura',
    value: 'operatore_forzatura',
    placeholder: 'Operatore forzatura',
    type: 'string',
    title: 'Operatore forzatura',
    field: 'operatore_forzatura',
    headerSort: true,
    formatter: 'text_replace',
    visible: true,
    emitEventOnSorting: true,
  },
];
