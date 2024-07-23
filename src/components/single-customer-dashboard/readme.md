# single-customer-dashboard



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type     | Default     |
| ------------------- | -------------------- | ----------- | -------- | ----------- |
| `additionalHeaders` | `additional-headers` |             | `any`    | `undefined` |
| `backendUrl`        | `backend-url`        |             | `string` | `undefined` |
| `crmId`             | `crm-id`             |             | `string` | `undefined` |


## Dependencies

### Used by

 - [blacklist-dashboard](../blacklist-dashboard)

### Depends on

- [edit-customer-modal](components)
- [add-customer-modal](components)
- [edit-customer-date-only-modal](components)
- [dashboard-base-table](../dashboard-base-table)

### Graph
```mermaid
graph TD;
  single-customer-dashboard --> edit-customer-modal
  single-customer-dashboard --> add-customer-modal
  single-customer-dashboard --> edit-customer-date-only-modal
  single-customer-dashboard --> dashboard-base-table
  dashboard-base-table --> shared-table-skeleton
  blacklist-dashboard --> single-customer-dashboard
  style single-customer-dashboard fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

* Copyright (c) 2022 bit2win team; *
