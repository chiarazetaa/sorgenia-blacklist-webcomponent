/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { AbiCabApi } from "./api/AbiCabApi";
import { PodPdrApi } from "./api/PodPdrApi";
export { AbiCabApi } from "./api/AbiCabApi";
export { PodPdrApi } from "./api/PodPdrApi";
export namespace Components {
    interface AbiCabTable {
        "backendUrl": string;
    }
    interface BlacklistDashboard {
        "backendUrl": string;
    }
    interface BlacklistDashboardStyles {
    }
    interface EditAbiCabModal {
        "api": AbiCabApi;
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
    interface HTMLEditAbiCabModalElement extends Components.EditAbiCabModal, HTMLStencilElement {
    }
    var HTMLEditAbiCabModalElement: {
        prototype: HTMLEditAbiCabModalElement;
        new (): HTMLEditAbiCabModalElement;
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
    interface HTMLElementTagNameMap {
        "abi-cab-table": HTMLAbiCabTableElement;
        "blacklist-dashboard": HTMLBlacklistDashboardElement;
        "blacklist-dashboard-styles": HTMLBlacklistDashboardStylesElement;
        "edit-abi-cab-modal": HTMLEditAbiCabModalElement;
        "edit-pod-pdr-modal": HTMLEditPodPdrModalElement;
        "new-abi-cab-modal": HTMLNewAbiCabModalElement;
        "new-pod-pdr-modal": HTMLNewPodPdrModalElement;
        "pod-pdr-table": HTMLPodPdrTableElement;
        "shared-modal": HTMLSharedModalElement;
        "shared-snackbar": HTMLSharedSnackbarElement;
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
    interface EditAbiCabModal {
        "api"?: AbiCabApi;
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
    interface IntrinsicElements {
        "abi-cab-table": AbiCabTable;
        "blacklist-dashboard": BlacklistDashboard;
        "blacklist-dashboard-styles": BlacklistDashboardStyles;
        "edit-abi-cab-modal": EditAbiCabModal;
        "edit-pod-pdr-modal": EditPodPdrModal;
        "new-abi-cab-modal": NewAbiCabModal;
        "new-pod-pdr-modal": NewPodPdrModal;
        "pod-pdr-table": PodPdrTable;
        "shared-modal": SharedModal;
        "shared-snackbar": SharedSnackbar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "abi-cab-table": LocalJSX.AbiCabTable & JSXBase.HTMLAttributes<HTMLAbiCabTableElement>;
            "blacklist-dashboard": LocalJSX.BlacklistDashboard & JSXBase.HTMLAttributes<HTMLBlacklistDashboardElement>;
            "blacklist-dashboard-styles": LocalJSX.BlacklistDashboardStyles & JSXBase.HTMLAttributes<HTMLBlacklistDashboardStylesElement>;
            "edit-abi-cab-modal": LocalJSX.EditAbiCabModal & JSXBase.HTMLAttributes<HTMLEditAbiCabModalElement>;
            "edit-pod-pdr-modal": LocalJSX.EditPodPdrModal & JSXBase.HTMLAttributes<HTMLEditPodPdrModalElement>;
            "new-abi-cab-modal": LocalJSX.NewAbiCabModal & JSXBase.HTMLAttributes<HTMLNewAbiCabModalElement>;
            "new-pod-pdr-modal": LocalJSX.NewPodPdrModal & JSXBase.HTMLAttributes<HTMLNewPodPdrModalElement>;
            "pod-pdr-table": LocalJSX.PodPdrTable & JSXBase.HTMLAttributes<HTMLPodPdrTableElement>;
            "shared-modal": LocalJSX.SharedModal & JSXBase.HTMLAttributes<HTMLSharedModalElement>;
            "shared-snackbar": LocalJSX.SharedSnackbar & JSXBase.HTMLAttributes<HTMLSharedSnackbarElement>;
        }
    }
}
