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
            <div style={{ height: '34px' }} class="col-md-12 skeleton-loader mb-2"></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1 "></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1 "></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1"></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1"></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1"></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1"></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1"></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader mb-1"></div>
            <div style={{ height: '30px' }} class="col-md-12 skeleton-loader"></div>
            {/*<div class="col-md-12 justify-content-end d-flex">*/}
            {/*  <div style={{ height: '35px', width: '150px', borderRadius: '100px', overflow: 'hidden' }} class=" skeleton-loader"></div>*/}
            {/*</div>*/}


          </div>
        </div>
      </Host>
    );
  }

}
