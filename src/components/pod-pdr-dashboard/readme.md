# pod-pdr-dashboard



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type     | Default     |
| ------------ | ------------- | ----------- | -------- | ----------- |
| `backendUrl` | `backend-url` |             | `string` | `undefined` |


## Dependencies

### Used by

 - [blacklist-dashboard](../blacklist-dashboard)

### Depends on

- [edit-pod-pdr-modal](components)
- [new-pod-pdr-modal](components)
- [bulk-pod-pdr-modal](components)
- [show-customers-pod-pdr-modal](components)
- [dashboard-base-filters](../dashboard-base-filters)
- [dashboard-base-table](../dashboard-base-table)

### Graph
```mermaid
graph TD;
  pod-pdr-dashboard --> edit-pod-pdr-modal
  pod-pdr-dashboard --> new-pod-pdr-modal
  pod-pdr-dashboard --> bulk-pod-pdr-modal
  pod-pdr-dashboard --> show-customers-pod-pdr-modal
  pod-pdr-dashboard --> dashboard-base-filters
  pod-pdr-dashboard --> dashboard-base-table
  dashboard-base-table --> shared-table-skeleton
  blacklist-dashboard --> pod-pdr-dashboard
  style pod-pdr-dashboard fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

* Copyright (c) 2022 bit2win team; *
