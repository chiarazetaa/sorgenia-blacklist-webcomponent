import { Component, Host, h, Prop, State } from '@stencil/core';
import { getSharedStore } from '../../store/shared.store';

@Component({
  tag: 'blacklist-dashboard',
  styleUrl: 'blacklist-dashboard.css',
  shadow: true,
})
export class BlacklistDashboard {

  @Prop() backendUrl: string;
  @Prop() additionalHeaders: any;
  @Prop() singleCustomerCrmId: number;

  @State() currentTab: 'CLIENTI' | 'ABI/CAB' | 'POD/PDR' = 'CLIENTI';
  sharedStore = getSharedStore();

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
        <permission-check backendUrl={this.backendUrl} additionalHeaders={this.additionalHeaders}>
          {this.sharedStore.state?.canShowRecords ?
            <div>
              {this.singleCustomerCrmId ?
                <single-customer-dashboard additional-headers={this.additionalHeaders} crm-id={this.singleCustomerCrmId}
                                           backend-url={this.backendUrl}></single-customer-dashboard> :
                <div>
                  <b2w-tabs selected-tab-path={this.currentTab} payload={JSON.stringify(this.tabs)}
                            disable-history="true"
                            customStyle={'.B2wTabs .ContainerItemTabs .ItemWrapper-Item:focus{outline: none; box-shadow: none !important}'}
                            onB2wTabsClick={e => this.selectTab(e)}></b2w-tabs>
                  <div class="mt-4">
                    {this.currentTab === 'CLIENTI' && <customers-dashboard additional-headers={this.additionalHeaders}
                                                                           backend-url={this.backendUrl}></customers-dashboard>}
                    {this.currentTab === 'POD/PDR' && <pod-pdr-dashboard additional-headers={this.additionalHeaders}
                                                                         backend-url={this.backendUrl}></pod-pdr-dashboard>}
                    {this.currentTab === 'ABI/CAB' && <abi-cab-dashboard additional-headers={this.additionalHeaders}
                                                                         backend-url={this.backendUrl}></abi-cab-dashboard>}
                  </div>
                </div>
              }
            </div> : <div class="text-center">
              Permesso <em>Operatore Credito BL / Operatore Vendite BL</em> mancante
            </div>}
        </permission-check>
        <shared-modal></shared-modal>
        <shared-snackbar></shared-snackbar>
      </Host>
    );
  }

}
