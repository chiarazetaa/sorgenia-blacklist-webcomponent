# customers-dashboard



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type     | Default     |
| ------------ | ------------- | ----------- | -------- | ----------- |
| `backendUrl` | `backend-url` |             | `string` | `undefined` |


## Dependencies

### Used by

 - [blacklist-dashboard](../blacklist-dashboard)

### Depends on

- [edit-customers-modal](components)
- [dashboard-base-filters](../dashboard-base-filters)
- [dashboard-base-table](../dashboard-base-table)

### Graph
```mermaid
graph TD;
  customers-dashboard --> edit-customers-modal
  customers-dashboard --> dashboard-base-filters
  customers-dashboard --> dashboard-base-table
  dashboard-base-table --> shared-table-skeleton
  blacklist-dashboard --> customers-dashboard
  style customers-dashboard fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

* Copyright (c) 2022 bit2win team; *
