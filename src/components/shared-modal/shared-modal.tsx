import { Component, h, Listen, State } from '@stencil/core';
import { MODAL_EVENTS } from '../../utils/utils';

@Component({
  tag: 'shared-modal',
  styleUrl: 'shared-modal.css',
  shadow: true,
})
export class SharedModal {

  @State() showModal = false;
  @State() content: any;
  @State() modalTitle: string;
  @State() eventNameOnSave: string;
  @State() confirmButtonText: string;
  @State() buttonIsLoading = false;

  @Listen("modalEvent", { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case MODAL_EVENTS.LOADING:
        this.buttonIsLoading = true;
        break;
      case MODAL_EVENTS.EXIT_LOADING:
        this.buttonIsLoading = false;
        break;
      case MODAL_EVENTS.SHOW:
        this.resetModal();
        if (event.detail?.component) {
          this.content = event.detail?.component;
        }
        if (event.detail?.eventNameOnSave) {
          this.eventNameOnSave = event.detail?.eventNameOnSave;
        }
        if (event.detail?.modalTitle) {
          this.modalTitle = event.detail?.modalTitle;
        }
        if (event.detail?.confirmButtonText) {
          this.confirmButtonText = event.detail?.confirmButtonText;
        }
        if (event.detail?.buttonIsLoading) {
          this.buttonIsLoading = event.detail?.buttonIsLoading;
        }
        this.showModal = true;
        break;
      case MODAL_EVENTS.HIDE:
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
  }

  handleSave = () => {
    console.log(this.eventNameOnSave);
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
          cancelButtonText="Annulla"
          buttonLoading={this.buttonIsLoading}
          okButtonVisible={true}
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
