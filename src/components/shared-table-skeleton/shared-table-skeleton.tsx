import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'shared-table-skeleton',
  styleUrl: 'shared-table-skeleton.css',
  shadow: false,
})
export class SharedTableSkeleton {

  render() {
    return (
      <Host>
        <div class="Loading-Mask pl-4 pr-4 mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
          <div class="row mb-4">
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1"></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1 "></div>
            <div style={{ height: '30px' }} class="co\l-md-12 skeleton-loader mb-1"></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader"></div>

          </div>
        </div>
      </Host>
    );
  }

}
