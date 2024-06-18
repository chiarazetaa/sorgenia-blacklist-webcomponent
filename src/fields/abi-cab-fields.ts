import { FilterField, TableField, ExtendedTableField } from '../interfaces/fields.interface';

export const abiCabFields: (FilterField & TableField & ExtendedTableField)[] = [
  {
    text: 'ID',
    value: '_id',
    placeholder: 'ID',
    type: 'string',
    title: 'ID',
    field: '_id',
    headerSort: false,
    formatter: 'fonts',
    showColumn: false,
    emitEventOnSorting: true,
  },
  {
    text: 'Abi',
    value: 'abi',
    placeholder: 'Abi',
    type: 'string',
    title: 'ABI',
    field: 'abi',
    headerSort: true,
    formatter: 'fonts',
    showColumn: true,

    emitEventOnSorting: true,
  },
  {
    text: 'Cab',
    value: 'cab',
    placeholder: 'Cab',
    type: 'string',
    title: 'CAB',
    field: 'cab',
    headerSort: true,
    formatter: 'fonts',
    showColumn: true,

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
    showColumn: true,

    emitEventOnSorting: true,
  },
  {
    text: 'Data cancellazione',
    value: 'data_cancellazione',
    placeholder: 'Data cancellazione',
    type: 'string',
    title: 'Data cancellazione',
    field: 'data_cancellazione',
    headerSort: true,
    formatter: 'datetime',
    showColumn: true,

    emitEventOnSorting: true,
  },
  {
    text: 'Operatore forzatura',
    value: 'operatore_forzatura',
    placeholder: 'Operatore forzatura',
    type: 'string',
    title: 'Operatore forzatura',
    field: 'operatore_forzatura',
    headerSort: true,
    formatter: 'fonts',
    showColumn: true,

    emitEventOnSorting: true,
  }
];
