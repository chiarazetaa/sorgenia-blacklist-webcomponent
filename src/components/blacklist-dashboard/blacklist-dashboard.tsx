import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'blacklist-dashboard',
  styleUrl: 'blacklist-dashboard.css',
  shadow: true,
})
export class BlacklistDashboard {

  @Prop() backendUrl: string;
  @State() currentTab: 'CLIENTI' | 'ABI/CAB' | 'POD/PDR' = 'POD/PDR';

  private tabs: Array<{ label: string, path: 'CLIENTI' | 'ABI/CAB' | 'POD/PDR' }> = [
    { label: 'Clienti', path: 'CLIENTI' },
    { label: 'ABI / CAB', path: 'ABI/CAB' },
    { label: 'POD / PDR', path: 'POD/PDR' },
  ];

  public selectTab(evt) {
    this.currentTab = evt.detail.path;
  }

  render() {
    return (
      <Host class="mx-4">
        <blacklist-dashboard-styles></blacklist-dashboard-styles>
        <div class="d-flex w-100 justify-content-start mb-4">
          <h3 class="open-title">
            <b>Cruscotto blacklist</b>
          </h3>
        </div>
        <b2w-tabs selected-tab-path={this.currentTab} payload={JSON.stringify(this.tabs)} disable-history="true"
                  onB2wTabsClick={e => this.selectTab(e)}></b2w-tabs>
        <div class="mt-4">
          {/*{this.currentTab === 'CLIENTI' && <residential-table backend-url={this.backendUrl}></residential-table>}*/}
          {/*{this.currentTab === 'ABI/CAB' && <business-table backend-url={this.backendUrl}></business-table>}*/}
          {this.currentTab === 'POD/PDR' && <abi-cab-table backend-url={this.backendUrl}></abi-cab-table>}
        </div>
        <shared-modal></shared-modal>
        <shared-snackbar></shared-snackbar>
      </Host>
    );
  }

}
