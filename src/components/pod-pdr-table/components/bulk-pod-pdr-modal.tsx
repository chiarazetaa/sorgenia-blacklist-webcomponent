import { Component, h, Host, Prop } from '@stencil/core';
import { PodPdrApi } from '../../../api/PodPdrApi';

@Component({
  tag: 'bulk-pod-pdr-modal',
  shadow: false,
})
export class BulkPodPdrModal {
  @Prop() api: PodPdrApi;

  render() {
    return (
      <Host>
        <base-bulk-modal api={this.api}></base-bulk-modal>
      </Host>
    );
  }

}
