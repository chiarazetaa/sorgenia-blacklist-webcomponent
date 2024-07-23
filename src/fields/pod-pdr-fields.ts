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
      color: { 'pod': 'color-type-1', 'pdr': 'color-type-2' },
    },
    visible: true,
    hozAlign: 'left',
    emitEventOnSorting: true,
  },
  ...baseFields,
  {
    text: 'Tipo inserimento',
    value: 'tipo_inserimento',
    placeholder: 'Tipo inserimento',
    type: 'picklist',
    title: 'Tipo inserimento',
    picklistvalues: [{ text: 'MANUALE', value: 'manuale' }, { text: 'AUTOMATICO', value: 'automatico' }],
    field: 'tipo_inserimento',
    headerSort: true,
    formatter: 'fonts',
    formatterParams: {
      className: 'table-info uppercase',
      // color: { 'manuale': 'color-type-1', 'automatico': 'color-type-2' },
      color: { 'manuale': 'bold' },
    },
    visible: true,
    emitEventOnSorting: true,
  }
];
