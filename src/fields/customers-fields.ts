import {
  FilterFieldBoolean, FilterFieldDate, FilterFieldNumber,
  FilterFieldPicklist,
  FilterFieldString,
  TableField,
} from '../interfaces/fields.interface';
import { baseFields } from './base-fields';

export const customersFields: ((FilterFieldString | FilterFieldNumber | FilterFieldBoolean | FilterFieldPicklist | FilterFieldDate) & TableField)[] = [
  {
    text: 'ID CRM',
    value: 'crm_id',
    placeholder: 'ID CRM',
    type: 'number',
    title: 'ID CRM',
    field: 'crm_id',
    headerSort: false,
    formatter: 'string',
    visible: true,
    emitEventOnSorting: true,
  },
  {
    text: 'Codice',
    value: 'codice_cliente',
    placeholder: 'Code',
    type: 'string',
    title: 'Codice',
    field: 'codice_cliente',
    headerSort: true,
    formatter: 'fonts',
    visible: true,
    emitEventOnSorting: true,
  },
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
      className: 'table-info bold uppercase',
      color: { 'manuale': 'color-type-1', 'automatico': 'color-type-2' },
    },
    visible: true,
    emitEventOnSorting: true,
  },
  {
    text: 'Nome',
    value: 'nome',
    placeholder: 'Nome',
    type: 'string',
    title: 'Nome',
    field: 'nome',
    headerSort: true,
    visible: true,
    emitEventOnSorting: true
  },
  {
    text: 'Cognome',
    value: 'cognome',
    placeholder: 'Cognome',
    type: 'string',
    title: 'Cognome',
    field: 'cognome',
    headerSort: true,
    visible: true,
    emitEventOnSorting: true,
  },
  {
    text: 'P.IVA',
    value: 'p_iva',
    placeholder: 'P.IVA',
    type: 'string',
    title: 'P.IVA',
    field: 'p_iva',
    headerSort: true,
    visible: true,
    emitEventOnSorting: true,
  },
  ...baseFields
];
