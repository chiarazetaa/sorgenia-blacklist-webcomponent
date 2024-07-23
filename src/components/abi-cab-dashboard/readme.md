# abi-cab-table



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type     | Default     |
| ------------------- | -------------------- | ----------- | -------- | ----------- |
| `additionalHeaders` | `additional-headers` |             | `any`    | `undefined` |
| `backendUrl`        | `backend-url`        |             | `string` | `undefined` |


## Dependencies

### Used by

 - [blacklist-dashboard](../blacklist-dashboard)

### Depends on

- [edit-abi-cab-modal](components)
- [new-abi-cab-modal](components)
- [dashboard-base-filters](../dashboard-base-filters)
- [dashboard-base-table](../dashboard-base-table)

### Graph
```mermaid
graph TD;
  abi-cab-dashboard --> edit-abi-cab-modal
  abi-cab-dashboard --> new-abi-cab-modal
  abi-cab-dashboard --> dashboard-base-filters
  abi-cab-dashboard --> dashboard-base-table
  dashboard-base-table --> shared-table-skeleton
  blacklist-dashboard --> abi-cab-dashboard
  style abi-cab-dashboard fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

* Copyright (c) 2022 bit2win team; *
