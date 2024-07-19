import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'blacklist-dashboard',
  styleUrl: 'blacklist-dashboard.css',
  shadow: true,
})
export class BlacklistDashboard {

  @Prop() backendUrl: string;
  @Prop() singleCustomerCrmId: number;

  @State() currentTab: 'CLIENTI' | 'ABI/CAB' | 'POD/PDR' = 'CLIENTI';

  private tabs: Array<{ label: string, path: 'CLIENTI' | 'ABI/CAB' | 'POD/PDR' }> = [
    { label: 'Clienti', path: 'CLIENTI' },
    { label: 'POD / PDR', path: 'POD/PDR' },
    { label: 'ABI / CAB', path: 'ABI/CAB' },
  ];

  public selectTab(evt) {
    this.currentTab = evt.detail.path;
  }

  render() {
    return (
      <Host class="mx-4 pt-4">
        <blacklist-dashboard-styles></blacklist-dashboard-styles>
        {this.singleCustomerCrmId ?
          <single-customer-table odoo-id={this.singleCustomerCrmId} backend-url={this.backendUrl}></single-customer-table> :
          <div>
            <b2w-tabs selected-tab-path={this.currentTab} payload={JSON.stringify(this.tabs)} disable-history="true"
                      onB2wTabsClick={e => this.selectTab(e)}></b2w-tabs>
            <div class="mt-4">
              {this.currentTab === 'CLIENTI' && <customers-table backend-url={this.backendUrl}></customers-table>}
              {this.currentTab === 'POD/PDR' && <pod-pdr-table backend-url={this.backendUrl}></pod-pdr-table>}
              {this.currentTab === 'ABI/CAB' && <abi-cab-table backend-url={this.backendUrl}></abi-cab-table>}
            </div>
          </div>
        }
        <shared-modal></shared-modal>
        <shared-snackbar></shared-snackbar>
      </Host>
    );
  }

}
