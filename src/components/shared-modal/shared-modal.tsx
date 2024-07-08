import { Component, h, Listen, State } from '@stencil/core';
import { MODAL_EVENTS, ModalEvents } from '../../utils/utils';

@Component({
  tag: 'shared-modal',
  styleUrl: 'shared-modal.css',
  shadow: false,
})
export class SharedModal {

  @State() showModal = false;
  @State() content: any;
  @State() modalTitle: string;
  @State() eventNameOnSave: string;
  @State() confirmButtonText: string;
  @State() cancelButtonText: string;
  @State() buttonIsLoading = false;
  @State() buttonIsDisabled = false;

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    const detail = event.detail as ModalEventDetail;
    switch (detail.type) {
      case MODAL_EVENTS.LOADING:
        this.buttonIsLoading = true;
        break;
      case MODAL_EVENTS.EXIT_LOADING:
        this.buttonIsLoading = false;
        break;
      case MODAL_EVENTS.DISABLE:
        this.buttonIsDisabled = true;
        break;
      case MODAL_EVENTS.EXIT_DISABLE:
        this.buttonIsDisabled = false;
        break;
      case MODAL_EVENTS.SHOW:
        this.resetModal();
        if (detail?.component) {
          this.content = detail?.component;
        }
        if (detail?.eventNameOnSave) {
          this.eventNameOnSave = detail?.eventNameOnSave;
        }
        if (detail?.modalTitle) {
          this.modalTitle = detail?.modalTitle;
        }
        if (detail?.confirmButtonText) {
          this.confirmButtonText = detail?.confirmButtonText;
        }
        if (detail?.cancelButtonText) {
          this.cancelButtonText = detail?.cancelButtonText;
        }
        if (detail?.buttonIsLoading) {
          this.buttonIsLoading = detail?.buttonIsLoading;
        }
        if (detail?.buttonIsDisabled) {
          this.buttonIsDisabled = detail?.buttonIsDisabled;
        }
        this.showModal = true;
        break;
      case MODAL_EVENTS.HIDE:
        this.resetModal();
        break;
      case MODAL_EVENTS.HIDE_AND_REFRESH:
        this.resetModal();
        break;
    }
  }

  resetModal() {
    this.showModal = false;
    this.buttonIsLoading = false;
    this.content = undefined;
    this.eventNameOnSave = undefined;
    this.confirmButtonText = undefined;
    this.cancelButtonText = undefined;
    this.buttonIsDisabled = undefined;
  }

  handleSave = () => {
    if (this.eventNameOnSave) {
      window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, { detail: { type: this.eventNameOnSave } }));
    } else {
      window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, { detail: { type: MODAL_EVENTS.HIDE } }));
    }
  };

  handleClose = () => {
    window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, { detail: { type: MODAL_EVENTS.HIDE } }));
  };

  render() {
    return (
      <div>
        {this.showModal && <b2w-modal
          visible={true}
          cancelButtonVisible={true}
          cancelButtonText={this.cancelButtonText || 'Annulla'}
          buttonLoading={this.buttonIsLoading}
          okButtonVisible={!!this.confirmButtonText}
          okButtonText={this.confirmButtonText || 'Conferma'}
          onb2wSave={this.handleSave}
          onb2wClose={this.handleClose}
          onb2wCancel={this.handleClose}
          modalTitle={this.modalTitle || undefined}
        >
          {this.content}
        </b2w-modal>}
      </div>
    );
  }

}


export interface ModalEventDetail {
  type: ModalEvents;
  component?: any;
  eventNameOnSave?: string;
  modalTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  buttonIsLoading?: boolean;
  buttonIsDisabled?: boolean;
}
