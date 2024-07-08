import { Component, h, Host, Prop } from '@stencil/core';
import { ClientiApi } from '../../../api/ClientiApi';

@Component({
  tag: 'bulk-customers-modal',
  shadow: false,
})
export class BulkCustomersModal {
  @Prop() api: ClientiApi;

  render() {
    return (
      <Host>
        <base-bulk-modal api={this.api}></base-bulk-modal>
      </Host>
    );
  }

}
