import {
  FilterFieldBoolean, FilterFieldDate,
  FilterFieldPicklist,
  FilterFieldString,
  TableField,
} from '../interfaces/fields.interface';
import { baseFields } from './base-fields';

export const clientiFields: ((FilterFieldString | FilterFieldBoolean | FilterFieldPicklist | FilterFieldDate) & TableField)[] = [
  {
    text: 'ID CRM',
    value: 'crm_id',
    placeholder: 'ID CRM',
    type: 'string',
    title: 'ID CRM',
    field: 'crm_id',
    headerSort: false,
    formatter: 'string',
    visible: true,
    emitEventOnSorting: true,
  },
  {
    text: 'Codice',
    value: 'code',
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
      className: 'table-info bold uppercase color-tertiary',
      color: { 'manuale': 'color-accent2', 'automatico': 'color-success' },
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
    formatter: 'fonts',
    visible: true,
    emitEventOnSorting: true,
  },
  {
    text: 'Cognome',
    value: 'cognome',
    placeholder: 'Nome',
    type: 'string',
    title: 'Nome',
    field: 'cognome',
    headerSort: true,
    formatter: 'fonts',
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
    formatter: 'fonts',
    visible: true,
    emitEventOnSorting: true,
  },
  ...baseFields
];
