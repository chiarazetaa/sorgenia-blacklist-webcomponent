import { Component, h, Listen, State } from '@stencil/core';
import { SNACKBAR_EVENTS } from '../../utils/utils';

@Component({
  tag: 'shared-snackbar',
  styleUrl: 'shared-snackbar.css',
  shadow: true,
})
export class SharedSnackbar {
  @State() showModal = false;
  @State() text: string;
  @State() status: 'error' | 'warning' | 'success' = 'error';
  @State() timeout: number = 5;
  @State() show: boolean = false;

  @Listen('snackbarEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case SNACKBAR_EVENTS.SHOW:
        if (event.detail?.text) {
          this.text = event.detail?.text;
        }
        if (event.detail?.status) {
          this.status = event.detail?.status;
        }
        if (event.detail?.timeout) {
          this.timeout = event.detail?.timeout;
        }
        this.show = true;
        break;
    }
  }

  render() {
    return (
      <div style={{ 'width': '500px' }}>
        {this.show && <b2w-snackbar
          text={this.text}
          timeout={this.timeout}
          isFixed={true}
          type={'top-2-bottom'}
          status={this.status}
          onB2wCloseEvent={() => this.show = false}
        >
        </b2w-snackbar>}
      </div>);
  }

}
