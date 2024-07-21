import {
  FilterFieldBoolean, FilterFieldDate,
  FilterFieldPicklist,
  FilterFieldString,
  TableField,
} from '../interfaces/fields.interface';
import { baseFields } from './base-fields';

export const abiCabFields: ((FilterFieldString | FilterFieldBoolean | FilterFieldPicklist | FilterFieldDate) & TableField)[] = [
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
    picklistvalues: [{ text: 'ABI', value: 'abi' }, { text: 'CAB', value: 'cab' }],
    field: 'type',
    headerSort: true,
    formatter: 'fonts',
    formatterParams: {
      className: 'table-info bold uppercase color-tertiary',
      color: { 'abi': 'color-type-1', 'cab': 'color-type-2' },
    },
    visible: true,
    emitEventOnSorting: true,
  },
  ...baseFields
];
