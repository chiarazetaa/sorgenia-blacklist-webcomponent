/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ClientiApi } from "./api/ClientiApi";
import { PodPdrApi } from "./api/PodPdrApi";
import { StoreKeys } from "./store/shared.store";
import { AbiCabApi } from "./api/AbiCabApi";
import { CustomerRow } from "./components/single-customer-dashboard/single-customer-dashboard";
export { ClientiApi } from "./api/ClientiApi";
export { PodPdrApi } from "./api/PodPdrApi";
export { StoreKeys } from "./store/shared.store";
export { AbiCabApi } from "./api/AbiCabApi";
export { CustomerRow } from "./components/single-customer-dashboard/single-customer-dashboard";
export namespace Components {
    interface AbiCabDashboard {
        "additionalHeaders": any;
        "backendUrl": string;
    }
    interface AddCustomerModal {
        "api": ClientiApi;
        "crmId": string;
    }
    interface BlacklistDashboard {
        "additionalHeaders": any;
        "backendUrl": string;
        "singleCustomerCrmId": number;
    }
    interface BlacklistDashboardStyles {
    }
    interface BulkPodPdrModal {
        "api": PodPdrApi;
    }
    interface CustomersDashboard {
        "additionalHeaders": any;
        "backendUrl": string;
    }
    interface DashboardBaseFilters {
        "storeKey": StoreKeys;
    }
    interface DashboardBaseTable {
        "customFormatters": any;
        "exportFn": (exportType: 'csv' | 'xls') => void;
        "isLoading": boolean;
        "payloadAction": any;
        "storeKey": StoreKeys;
    }
    interface EditAbiCabDateOnlyModal {
        "api": AbiCabApi;
        "documentIds": any[];
    }
    interface EditCustomerDateOnlyModal {
        "api": ClientiApi;
        "documentIds": any[];
    }
    interface EditCustomerModal {
        "api": ClientiApi;
        "customerBlacklistRow": CustomerRow;
    }
    interface EditCustomersDateOnlyModal {
        "api": ClientiApi;
        "documentIds": any[];
    }
    interface EditPodPdrDateOnlyModal {
        "api": PodPdrApi;
        "documentIds": any[];
    }
    interface ExportTableModal {
        "exportFn": (exportType: 'csv' | 'xls') => void;
    }
    interface NewAbiCabModal {
        "api": AbiCabApi;
    }
    interface NewPodPdrModal {
        "api": PodPdrApi;
    }
    interface PermissionCheck {
        "additionalHeaders": any;
        "backendUrl": string;
    }
    interface PodPdrDashboard {
        "additionalHeaders": any;
        "backendUrl": string;
    }
    interface SharedModal {
    }
    interface SharedSnackbar {
    }
    interface SharedTableSkeleton {
    }
    interface ShowCustomersPodPdrModal {
        "customerRequestingActivation": any;
        "customers": any[];
    }
    interface ShowHistoryModal {
        "recordWithHistory": {created_at:string, created_by:string, update_history: {updated_at:string, updated_by:string, updated_fields: any}[]};
    }
    interface SingleCustomerDashboard {
        "additionalHeaders": any;
        "backendUrl": string;
        "crmId": string;
        "isCustomerBlacklisted": boolean;
    }
}
export interface DashboardBaseTableCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDashboardBaseTableElement;
}
declare global {
    interface HTMLAbiCabDashboardElement extends Components.AbiCabDashboard, HTMLStencilElement {
    }
    var HTMLAbiCabDashboardElement: {
        prototype: HTMLAbiCabDashboardElement;
        new (): HTMLAbiCabDashboardElement;
    };
    interface HTMLAddCustomerModalElement extends Components.AddCustomerModal, HTMLStencilElement {
    }
    var HTMLAddCustomerModalElement: {
        prototype: HTMLAddCustomerModalElement;
        new (): HTMLAddCustomerModalElement;
    };
    interface HTMLBlacklistDashboardElement extends Components.BlacklistDashboard, HTMLStencilElement {
    }
    var HTMLBlacklistDashboardElement: {
        prototype: HTMLBlacklistDashboardElement;
        new (): HTMLBlacklistDashboardElement;
    };
    interface HTMLBlacklistDashboardStylesElement extends Components.BlacklistDashboardStyles, HTMLStencilElement {
    }
    var HTMLBlacklistDashboardStylesElement: {
        prototype: HTMLBlacklistDashboardStylesElement;
        new (): HTMLBlacklistDashboardStylesElement;
    };
    interface HTMLBulkPodPdrModalElement extends Components.BulkPodPdrModal, HTMLStencilElement {
    }
    var HTMLBulkPodPdrModalElement: {
        prototype: HTMLBulkPodPdrModalElement;
        new (): HTMLBulkPodPdrModalElement;
    };
    interface HTMLCustomersDashboardElement extends Components.CustomersDashboard, HTMLStencilElement {
    }
    var HTMLCustomersDashboardElement: {
        prototype: HTMLCustomersDashboardElement;
        new (): HTMLCustomersDashboardElement;
    };
    interface HTMLDashboardBaseFiltersElement extends Components.DashboardBaseFilters, HTMLStencilElement {
    }
    var HTMLDashboardBaseFiltersElement: {
        prototype: HTMLDashboardBaseFiltersElement;
        new (): HTMLDashboardBaseFiltersElement;
    };
    interface HTMLDashboardBaseTableElementEventMap {
        "tableActionEvent": { type: string, data: any };
    }
    interface HTMLDashboardBaseTableElement extends Components.DashboardBaseTable, HTMLStencilElement {
        addEventListener<K extends keyof HTMLDashboardBaseTableElementEventMap>(type: K, listener: (this: HTMLDashboardBaseTableElement, ev: DashboardBaseTableCustomEvent<HTMLDashboardBaseTableElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLDashboardBaseTableElementEventMap>(type: K, listener: (this: HTMLDashboardBaseTableElement, ev: DashboardBaseTableCustomEvent<HTMLDashboardBaseTableElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLDashboardBaseTableElement: {
        prototype: HTMLDashboardBaseTableElement;
        new (): HTMLDashboardBaseTableElement;
    };
    interface HTMLEditAbiCabDateOnlyModalElement extends Components.EditAbiCabDateOnlyModal, HTMLStencilElement {
    }
    var HTMLEditAbiCabDateOnlyModalElement: {
        prototype: HTMLEditAbiCabDateOnlyModalElement;
        new (): HTMLEditAbiCabDateOnlyModalElement;
    };
    interface HTMLEditCustomerDateOnlyModalElement extends Components.EditCustomerDateOnlyModal, HTMLStencilElement {
    }
    var HTMLEditCustomerDateOnlyModalElement: {
        prototype: HTMLEditCustomerDateOnlyModalElement;
        new (): HTMLEditCustomerDateOnlyModalElement;
    };
    interface HTMLEditCustomerModalElement extends Components.EditCustomerModal, HTMLStencilElement {
    }
    var HTMLEditCustomerModalElement: {
        prototype: HTMLEditCustomerModalElement;
        new (): HTMLEditCustomerModalElement;
    };
    interface HTMLEditCustomersDateOnlyModalElement extends Components.EditCustomersDateOnlyModal, HTMLStencilElement {
    }
    var HTMLEditCustomersDateOnlyModalElement: {
        prototype: HTMLEditCustomersDateOnlyModalElement;
        new (): HTMLEditCustomersDateOnlyModalElement;
    };
    interface HTMLEditPodPdrDateOnlyModalElement extends Components.EditPodPdrDateOnlyModal, HTMLStencilElement {
    }
    var HTMLEditPodPdrDateOnlyModalElement: {
        prototype: HTMLEditPodPdrDateOnlyModalElement;
        new (): HTMLEditPodPdrDateOnlyModalElement;
    };
    interface HTMLExportTableModalElement extends Components.ExportTableModal, HTMLStencilElement {
    }
    var HTMLExportTableModalElement: {
        prototype: HTMLExportTableModalElement;
        new (): HTMLExportTableModalElement;
    };
    interface HTMLNewAbiCabModalElement extends Components.NewAbiCabModal, HTMLStencilElement {
    }
    var HTMLNewAbiCabModalElement: {
        prototype: HTMLNewAbiCabModalElement;
        new (): HTMLNewAbiCabModalElement;
    };
    interface HTMLNewPodPdrModalElement extends Components.NewPodPdrModal, HTMLStencilElement {
    }
    var HTMLNewPodPdrModalElement: {
        prototype: HTMLNewPodPdrModalElement;
        new (): HTMLNewPodPdrModalElement;
    };
    interface HTMLPermissionCheckElement extends Components.PermissionCheck, HTMLStencilElement {
    }
    var HTMLPermissionCheckElement: {
        prototype: HTMLPermissionCheckElement;
        new (): HTMLPermissionCheckElement;
    };
    interface HTMLPodPdrDashboardElement extends Components.PodPdrDashboard, HTMLStencilElement {
    }
    var HTMLPodPdrDashboardElement: {
        prototype: HTMLPodPdrDashboardElement;
        new (): HTMLPodPdrDashboardElement;
    };
    interface HTMLSharedModalElement extends Components.SharedModal, HTMLStencilElement {
    }
    var HTMLSharedModalElement: {
        prototype: HTMLSharedModalElement;
        new (): HTMLSharedModalElement;
    };
    interface HTMLSharedSnackbarElement extends Components.SharedSnackbar, HTMLStencilElement {
    }
    var HTMLSharedSnackbarElement: {
        prototype: HTMLSharedSnackbarElement;
        new (): HTMLSharedSnackbarElement;
    };
    interface HTMLSharedTableSkeletonElement extends Components.SharedTableSkeleton, HTMLStencilElement {
    }
    var HTMLSharedTableSkeletonElement: {
        prototype: HTMLSharedTableSkeletonElement;
        new (): HTMLSharedTableSkeletonElement;
    };
    interface HTMLShowCustomersPodPdrModalElement extends Components.ShowCustomersPodPdrModal, HTMLStencilElement {
    }
    var HTMLShowCustomersPodPdrModalElement: {
        prototype: HTMLShowCustomersPodPdrModalElement;
        new (): HTMLShowCustomersPodPdrModalElement;
    };
    interface HTMLShowHistoryModalElement extends Components.ShowHistoryModal, HTMLStencilElement {
    }
    var HTMLShowHistoryModalElement: {
        prototype: HTMLShowHistoryModalElement;
        new (): HTMLShowHistoryModalElement;
    };
    interface HTMLSingleCustomerDashboardElement extends Components.SingleCustomerDashboard, HTMLStencilElement {
    }
    var HTMLSingleCustomerDashboardElement: {
        prototype: HTMLSingleCustomerDashboardElement;
        new (): HTMLSingleCustomerDashboardElement;
    };
    interface HTMLElementTagNameMap {
        "abi-cab-dashboard": HTMLAbiCabDashboardElement;
        "add-customer-modal": HTMLAddCustomerModalElement;
        "blacklist-dashboard": HTMLBlacklistDashboardElement;
        "blacklist-dashboard-styles": HTMLBlacklistDashboardStylesElement;
        "bulk-pod-pdr-modal": HTMLBulkPodPdrModalElement;
        "customers-dashboard": HTMLCustomersDashboardElement;
        "dashboard-base-filters": HTMLDashboardBaseFiltersElement;
        "dashboard-base-table": HTMLDashboardBaseTableElement;
        "edit-abi-cab-date-only-modal": HTMLEditAbiCabDateOnlyModalElement;
        "edit-customer-date-only-modal": HTMLEditCustomerDateOnlyModalElement;
        "edit-customer-modal": HTMLEditCustomerModalElement;
        "edit-customers-date-only-modal": HTMLEditCustomersDateOnlyModalElement;
        "edit-pod-pdr-date-only-modal": HTMLEditPodPdrDateOnlyModalElement;
        "export-table-modal": HTMLExportTableModalElement;
        "new-abi-cab-modal": HTMLNewAbiCabModalElement;
        "new-pod-pdr-modal": HTMLNewPodPdrModalElement;
        "permission-check": HTMLPermissionCheckElement;
        "pod-pdr-dashboard": HTMLPodPdrDashboardElement;
        "shared-modal": HTMLSharedModalElement;
        "shared-snackbar": HTMLSharedSnackbarElement;
        "shared-table-skeleton": HTMLSharedTableSkeletonElement;
        "show-customers-pod-pdr-modal": HTMLShowCustomersPodPdrModalElement;
        "show-history-modal": HTMLShowHistoryModalElement;
        "single-customer-dashboard": HTMLSingleCustomerDashboardElement;
    }
}
declare namespace LocalJSX {
    interface AbiCabDashboard {
        "additionalHeaders"?: any;
        "backendUrl"?: string;
    }
    interface AddCustomerModal {
        "api"?: ClientiApi;
        "crmId"?: string;
    }
    interface BlacklistDashboard {
        "additionalHeaders"?: any;
        "backendUrl"?: string;
        "singleCustomerCrmId"?: number;
    }
    interface BlacklistDashboardStyles {
    }
    interface BulkPodPdrModal {
        "api"?: PodPdrApi;
    }
    interface CustomersDashboard {
        "additionalHeaders"?: any;
        "backendUrl"?: string;
    }
    interface DashboardBaseFilters {
        "storeKey"?: StoreKeys;
    }
    interface DashboardBaseTable {
        "customFormatters"?: any;
        "exportFn"?: (exportType: 'csv' | 'xls') => void;
        "isLoading"?: boolean;
        "onTableActionEvent"?: (event: DashboardBaseTableCustomEvent<{ type: string, data: any }>) => void;
        "payloadAction"?: any;
        "storeKey"?: StoreKeys;
    }
    interface EditAbiCabDateOnlyModal {
        "api"?: AbiCabApi;
        "documentIds"?: any[];
    }
    interface EditCustomerDateOnlyModal {
        "api"?: ClientiApi;
        "documentIds"?: any[];
    }
    interface EditCustomerModal {
        "api"?: ClientiApi;
        "customerBlacklistRow"?: CustomerRow;
    }
    interface EditCustomersDateOnlyModal {
        "api"?: ClientiApi;
        "documentIds"?: any[];
    }
    interface EditPodPdrDateOnlyModal {
        "api"?: PodPdrApi;
        "documentIds"?: any[];
    }
    interface ExportTableModal {
        "exportFn"?: (exportType: 'csv' | 'xls') => void;
    }
    interface NewAbiCabModal {
        "api"?: AbiCabApi;
    }
    interface NewPodPdrModal {
        "api"?: PodPdrApi;
    }
    interface PermissionCheck {
        "additionalHeaders"?: any;
        "backendUrl"?: string;
    }
    interface PodPdrDashboard {
        "additionalHeaders"?: any;
        "backendUrl"?: string;
    }
    interface SharedModal {
    }
    interface SharedSnackbar {
    }
    interface SharedTableSkeleton {
    }
    interface ShowCustomersPodPdrModal {
        "customerRequestingActivation"?: any;
        "customers"?: any[];
    }
    interface ShowHistoryModal {
        "recordWithHistory"?: {created_at:string, created_by:string, update_history: {updated_at:string, updated_by:string, updated_fields: any}[]};
    }
    interface SingleCustomerDashboard {
        "additionalHeaders"?: any;
        "backendUrl"?: string;
        "crmId"?: string;
        "isCustomerBlacklisted"?: boolean;
    }
    interface IntrinsicElements {
        "abi-cab-dashboard": AbiCabDashboard;
        "add-customer-modal": AddCustomerModal;
        "blacklist-dashboard": BlacklistDashboard;
        "blacklist-dashboard-styles": BlacklistDashboardStyles;
        "bulk-pod-pdr-modal": BulkPodPdrModal;
        "customers-dashboard": CustomersDashboard;
        "dashboard-base-filters": DashboardBaseFilters;
        "dashboard-base-table": DashboardBaseTable;
        "edit-abi-cab-date-only-modal": EditAbiCabDateOnlyModal;
        "edit-customer-date-only-modal": EditCustomerDateOnlyModal;
        "edit-customer-modal": EditCustomerModal;
        "edit-customers-date-only-modal": EditCustomersDateOnlyModal;
        "edit-pod-pdr-date-only-modal": EditPodPdrDateOnlyModal;
        "export-table-modal": ExportTableModal;
        "new-abi-cab-modal": NewAbiCabModal;
        "new-pod-pdr-modal": NewPodPdrModal;
        "permission-check": PermissionCheck;
        "pod-pdr-dashboard": PodPdrDashboard;
        "shared-modal": SharedModal;
        "shared-snackbar": SharedSnackbar;
        "shared-table-skeleton": SharedTableSkeleton;
        "show-customers-pod-pdr-modal": ShowCustomersPodPdrModal;
        "show-history-modal": ShowHistoryModal;
        "single-customer-dashboard": SingleCustomerDashboard;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "abi-cab-dashboard": LocalJSX.AbiCabDashboard & JSXBase.HTMLAttributes<HTMLAbiCabDashboardElement>;
            "add-customer-modal": LocalJSX.AddCustomerModal & JSXBase.HTMLAttributes<HTMLAddCustomerModalElement>;
            "blacklist-dashboard": LocalJSX.BlacklistDashboard & JSXBase.HTMLAttributes<HTMLBlacklistDashboardElement>;
            "blacklist-dashboard-styles": LocalJSX.BlacklistDashboardStyles & JSXBase.HTMLAttributes<HTMLBlacklistDashboardStylesElement>;
            "bulk-pod-pdr-modal": LocalJSX.BulkPodPdrModal & JSXBase.HTMLAttributes<HTMLBulkPodPdrModalElement>;
            "customers-dashboard": LocalJSX.CustomersDashboard & JSXBase.HTMLAttributes<HTMLCustomersDashboardElement>;
            "dashboard-base-filters": LocalJSX.DashboardBaseFilters & JSXBase.HTMLAttributes<HTMLDashboardBaseFiltersElement>;
            "dashboard-base-table": LocalJSX.DashboardBaseTable & JSXBase.HTMLAttributes<HTMLDashboardBaseTableElement>;
            "edit-abi-cab-date-only-modal": LocalJSX.EditAbiCabDateOnlyModal & JSXBase.HTMLAttributes<HTMLEditAbiCabDateOnlyModalElement>;
            "edit-customer-date-only-modal": LocalJSX.EditCustomerDateOnlyModal & JSXBase.HTMLAttributes<HTMLEditCustomerDateOnlyModalElement>;
            "edit-customer-modal": LocalJSX.EditCustomerModal & JSXBase.HTMLAttributes<HTMLEditCustomerModalElement>;
            "edit-customers-date-only-modal": LocalJSX.EditCustomersDateOnlyModal & JSXBase.HTMLAttributes<HTMLEditCustomersDateOnlyModalElement>;
            "edit-pod-pdr-date-only-modal": LocalJSX.EditPodPdrDateOnlyModal & JSXBase.HTMLAttributes<HTMLEditPodPdrDateOnlyModalElement>;
            "export-table-modal": LocalJSX.ExportTableModal & JSXBase.HTMLAttributes<HTMLExportTableModalElement>;
            "new-abi-cab-modal": LocalJSX.NewAbiCabModal & JSXBase.HTMLAttributes<HTMLNewAbiCabModalElement>;
            "new-pod-pdr-modal": LocalJSX.NewPodPdrModal & JSXBase.HTMLAttributes<HTMLNewPodPdrModalElement>;
            "permission-check": LocalJSX.PermissionCheck & JSXBase.HTMLAttributes<HTMLPermissionCheckElement>;
            "pod-pdr-dashboard": LocalJSX.PodPdrDashboard & JSXBase.HTMLAttributes<HTMLPodPdrDashboardElement>;
            "shared-modal": LocalJSX.SharedModal & JSXBase.HTMLAttributes<HTMLSharedModalElement>;
            "shared-snackbar": LocalJSX.SharedSnackbar & JSXBase.HTMLAttributes<HTMLSharedSnackbarElement>;
            "shared-table-skeleton": LocalJSX.SharedTableSkeleton & JSXBase.HTMLAttributes<HTMLSharedTableSkeletonElement>;
            "show-customers-pod-pdr-modal": LocalJSX.ShowCustomersPodPdrModal & JSXBase.HTMLAttributes<HTMLShowCustomersPodPdrModalElement>;
            "show-history-modal": LocalJSX.ShowHistoryModal & JSXBase.HTMLAttributes<HTMLShowHistoryModalElement>;
            "single-customer-dashboard": LocalJSX.SingleCustomerDashboard & JSXBase.HTMLAttributes<HTMLSingleCustomerDashboardElement>;
        }
    }
}
