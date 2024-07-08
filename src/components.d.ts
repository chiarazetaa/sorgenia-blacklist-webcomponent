/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { PodPdrApi } from "./api/PodPdrApi";
import { AbiCabApi } from "./api/AbiCabApi";
import { ClientiApi } from "./api/ClientiApi";
export { PodPdrApi } from "./api/PodPdrApi";
export { AbiCabApi } from "./api/AbiCabApi";
export { ClientiApi } from "./api/ClientiApi";
export namespace Components {
    interface AbiCabTable {
        "backendUrl": string;
    }
    interface BlacklistDashboard {
        "backendUrl": string;
    }
    interface BlacklistDashboardStyles {
    }
    interface BulkPodPdrModal {
        "api": PodPdrApi;
    }
    interface CustomersTable {
        "backendUrl": string;
    }
    interface EditAbiCabModal {
        "api": AbiCabApi;
        "documentIds": any[];
    }
    interface EditCustomersModal {
        "api": ClientiApi;
        "documentIds": any[];
    }
    interface EditPodPdrModal {
        "api": PodPdrApi;
        "documentIds": any[];
    }
    interface NewAbiCabModal {
        "api": AbiCabApi;
    }
    interface NewPodPdrModal {
        "api": PodPdrApi;
    }
    interface PodPdrTable {
        "backendUrl": string;
    }
    interface SharedModal {
    }
    interface SharedSnackbar {
    }
    interface ShowCustomersPodPdrModal {
        "customers": any[];
    }
}
declare global {
    interface HTMLAbiCabTableElement extends Components.AbiCabTable, HTMLStencilElement {
    }
    var HTMLAbiCabTableElement: {
        prototype: HTMLAbiCabTableElement;
        new (): HTMLAbiCabTableElement;
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
    interface HTMLCustomersTableElement extends Components.CustomersTable, HTMLStencilElement {
    }
    var HTMLCustomersTableElement: {
        prototype: HTMLCustomersTableElement;
        new (): HTMLCustomersTableElement;
    };
    interface HTMLEditAbiCabModalElement extends Components.EditAbiCabModal, HTMLStencilElement {
    }
    var HTMLEditAbiCabModalElement: {
        prototype: HTMLEditAbiCabModalElement;
        new (): HTMLEditAbiCabModalElement;
    };
    interface HTMLEditCustomersModalElement extends Components.EditCustomersModal, HTMLStencilElement {
    }
    var HTMLEditCustomersModalElement: {
        prototype: HTMLEditCustomersModalElement;
        new (): HTMLEditCustomersModalElement;
    };
    interface HTMLEditPodPdrModalElement extends Components.EditPodPdrModal, HTMLStencilElement {
    }
    var HTMLEditPodPdrModalElement: {
        prototype: HTMLEditPodPdrModalElement;
        new (): HTMLEditPodPdrModalElement;
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
    interface HTMLPodPdrTableElement extends Components.PodPdrTable, HTMLStencilElement {
    }
    var HTMLPodPdrTableElement: {
        prototype: HTMLPodPdrTableElement;
        new (): HTMLPodPdrTableElement;
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
    interface HTMLShowCustomersPodPdrModalElement extends Components.ShowCustomersPodPdrModal, HTMLStencilElement {
    }
    var HTMLShowCustomersPodPdrModalElement: {
        prototype: HTMLShowCustomersPodPdrModalElement;
        new (): HTMLShowCustomersPodPdrModalElement;
    };
    interface HTMLElementTagNameMap {
        "abi-cab-table": HTMLAbiCabTableElement;
        "blacklist-dashboard": HTMLBlacklistDashboardElement;
        "blacklist-dashboard-styles": HTMLBlacklistDashboardStylesElement;
        "bulk-pod-pdr-modal": HTMLBulkPodPdrModalElement;
        "customers-table": HTMLCustomersTableElement;
        "edit-abi-cab-modal": HTMLEditAbiCabModalElement;
        "edit-customers-modal": HTMLEditCustomersModalElement;
        "edit-pod-pdr-modal": HTMLEditPodPdrModalElement;
        "new-abi-cab-modal": HTMLNewAbiCabModalElement;
        "new-pod-pdr-modal": HTMLNewPodPdrModalElement;
        "pod-pdr-table": HTMLPodPdrTableElement;
        "shared-modal": HTMLSharedModalElement;
        "shared-snackbar": HTMLSharedSnackbarElement;
        "show-customers-pod-pdr-modal": HTMLShowCustomersPodPdrModalElement;
    }
}
declare namespace LocalJSX {
    interface AbiCabTable {
        "backendUrl"?: string;
    }
    interface BlacklistDashboard {
        "backendUrl"?: string;
    }
    interface BlacklistDashboardStyles {
    }
    interface BulkPodPdrModal {
        "api"?: PodPdrApi;
    }
    interface CustomersTable {
        "backendUrl"?: string;
    }
    interface EditAbiCabModal {
        "api"?: AbiCabApi;
        "documentIds"?: any[];
    }
    interface EditCustomersModal {
        "api"?: ClientiApi;
        "documentIds"?: any[];
    }
    interface EditPodPdrModal {
        "api"?: PodPdrApi;
        "documentIds"?: any[];
    }
    interface NewAbiCabModal {
        "api"?: AbiCabApi;
    }
    interface NewPodPdrModal {
        "api"?: PodPdrApi;
    }
    interface PodPdrTable {
        "backendUrl"?: string;
    }
    interface SharedModal {
    }
    interface SharedSnackbar {
    }
    interface ShowCustomersPodPdrModal {
        "customers"?: any[];
    }
    interface IntrinsicElements {
        "abi-cab-table": AbiCabTable;
        "blacklist-dashboard": BlacklistDashboard;
        "blacklist-dashboard-styles": BlacklistDashboardStyles;
        "bulk-pod-pdr-modal": BulkPodPdrModal;
        "customers-table": CustomersTable;
        "edit-abi-cab-modal": EditAbiCabModal;
        "edit-customers-modal": EditCustomersModal;
        "edit-pod-pdr-modal": EditPodPdrModal;
        "new-abi-cab-modal": NewAbiCabModal;
        "new-pod-pdr-modal": NewPodPdrModal;
        "pod-pdr-table": PodPdrTable;
        "shared-modal": SharedModal;
        "shared-snackbar": SharedSnackbar;
        "show-customers-pod-pdr-modal": ShowCustomersPodPdrModal;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "abi-cab-table": LocalJSX.AbiCabTable & JSXBase.HTMLAttributes<HTMLAbiCabTableElement>;
            "blacklist-dashboard": LocalJSX.BlacklistDashboard & JSXBase.HTMLAttributes<HTMLBlacklistDashboardElement>;
            "blacklist-dashboard-styles": LocalJSX.BlacklistDashboardStyles & JSXBase.HTMLAttributes<HTMLBlacklistDashboardStylesElement>;
            "bulk-pod-pdr-modal": LocalJSX.BulkPodPdrModal & JSXBase.HTMLAttributes<HTMLBulkPodPdrModalElement>;
            "customers-table": LocalJSX.CustomersTable & JSXBase.HTMLAttributes<HTMLCustomersTableElement>;
            "edit-abi-cab-modal": LocalJSX.EditAbiCabModal & JSXBase.HTMLAttributes<HTMLEditAbiCabModalElement>;
            "edit-customers-modal": LocalJSX.EditCustomersModal & JSXBase.HTMLAttributes<HTMLEditCustomersModalElement>;
            "edit-pod-pdr-modal": LocalJSX.EditPodPdrModal & JSXBase.HTMLAttributes<HTMLEditPodPdrModalElement>;
            "new-abi-cab-modal": LocalJSX.NewAbiCabModal & JSXBase.HTMLAttributes<HTMLNewAbiCabModalElement>;
            "new-pod-pdr-modal": LocalJSX.NewPodPdrModal & JSXBase.HTMLAttributes<HTMLNewPodPdrModalElement>;
            "pod-pdr-table": LocalJSX.PodPdrTable & JSXBase.HTMLAttributes<HTMLPodPdrTableElement>;
            "shared-modal": LocalJSX.SharedModal & JSXBase.HTMLAttributes<HTMLSharedModalElement>;
            "shared-snackbar": LocalJSX.SharedSnackbar & JSXBase.HTMLAttributes<HTMLSharedSnackbarElement>;
            "show-customers-pod-pdr-modal": LocalJSX.ShowCustomersPodPdrModal & JSXBase.HTMLAttributes<HTMLShowCustomersPodPdrModalElement>;
        }
    }
}
