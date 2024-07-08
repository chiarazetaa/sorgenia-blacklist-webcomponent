import { Component, h, Host, Prop } from '@stencil/core';
import { AbiCabApi } from '../../../api/AbiCabApi';

@Component({
  tag: 'bulk-abi-cab-modal',
  shadow: false,
})
export class BulkAbiCAbModal {
  @Prop() api: AbiCabApi;

  render() {
    return (
      <Host>
        <base-bulk-modal api={this.api}></base-bulk-modal>
      </Host>
    );
  }

}
