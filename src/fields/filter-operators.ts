export const filterOperators = [
  {
    type: 'string',
    options: [
      {
        key: 'like',
        value: 'Contiene',
      },
      {
        key: 'notLike',
        value: 'Non contiene',
      },
      {
        key: '=',
        value: 'Uguale a',
      },
      {
        key: '!=',
        value: 'Non è uguale a',
      },
    ],
  },
  {
    type: 'boolean',
    options: [
      {
        key: '=',
        value: 'Si',
      },
      {
        key: '=',
        value: 'No',
      }
    ],
  },
  {
    type: 'picklist',
    options: [
      {
        key:"in",
        value:"Include"
      }
    ]
  }
]
