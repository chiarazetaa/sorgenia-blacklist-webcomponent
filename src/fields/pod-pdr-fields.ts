import {
  FilterFieldBoolean, FilterFieldDate,
  FilterFieldPicklist,
  FilterFieldString,
  TableField,
} from '../interfaces/fields.interface';
import { baseFields } from './base-fields';

export const podPdrFields: ((FilterFieldString | FilterFieldBoolean | FilterFieldPicklist | FilterFieldDate) & TableField)[] = [
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
    emitEventOnSorting: true,
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
    hozAlign: 'left',
    emitEventOnSorting: true,
  },
  ...baseFields,
  {
    text: 'Blacklist attiva',
    value: 'is_blacklist_active',
    type: "string",
    placeholder: 'Blacklist attiva',
    title: 'Blacklist attiva',
    field: 'is_blacklist_active',
    headerSort: true,
    formatter: 'boolean_dots',
    visible: true,
    hozAlign: 'left',
    emitEventOnSorting: true,
  },
];
