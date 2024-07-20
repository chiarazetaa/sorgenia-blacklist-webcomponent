import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { INTERNAL_EVENTS, MODAL_EVENTS } from '../../utils/utils';
import { PodPdrApi } from '../../api/PodPdrApi';
import { openModal } from '../../services/modal-service';
import { showSnackbar } from '../../services/snackbar-service';
import { getStore, StoreKey } from '../../store/shared.store';

@Component({
  tag: 'pod-pdr-dashboard',
  styleUrl: 'pod-pdr-dashboard.css',
  shadow: false,
})
export class PodPdrDashboard {
  store = getStore(StoreKey.POD_PDR);
  @Prop() backendUrl: string;
  @State() isLoading: boolean;
  api: PodPdrApi;

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    if ([MODAL_EVENTS.HIDE_AND_REFRESH].includes(event.detail.type)) {
      this.loadData();
    }
  }

  @Listen(INTERNAL_EVENTS.REFRESH_DATA, { target: 'window' })
  reloadDataHandler() {
    this.loadData();
  }

  @Listen('tableActionEvent', { target: 'window' })
  handleTableActionEvent(event: {detail:{type:string, data: any}}) {
    switch (event.detail.type.toUpperCase()) {
      case 'SHOW-USERS':
        const component = <show-customers-pod-pdr-modal customers={event.detail.data.clienti}></show-customers-pod-pdr-modal>;
        openModal(component, undefined, 'Clienti associati al POD/PDR', undefined, 'Esci');
        break;
    }
  }

  componentWillLoad() {
    this.api = new PodPdrApi(this.backendUrl);
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    try {
      const {
        data: newData,
        total_items,
      } = await this.api.getPodPdrBlacklist(this.store.state.parsedFilters, `skip=${(this.store.state.currentPage - 1) * this.store.state.limit}&limit=${this.store.state.limit}&sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
      this.store.state.tableData = { data: [...newData], total_items };

    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  openEditModalPodPdr = () => {
    const component = <edit-pod-pdr-modal api={this.api}
                                          documentIds={this.store.state.selectedRows.map(sr => sr._id)}></edit-pod-pdr-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', 'Conferma');
  };

  openNewPodPdrModal = () => {
    const component = <new-pod-pdr-modal api={this.api}></new-pod-pdr-modal>;
    openModal(component, MODAL_EVENTS.SAVE_NEW, 'Aggiungi POD/PDR in Blacklist', 'Conferma');
  };

  openBulkModalPodPdr = () => {
    const component = <bulk-pod-pdr-modal api={this.api}></bulk-pod-pdr-modal>;
    openModal(component, MODAL_EVENTS.SAVE_NEW, 'Import massivo POD/PDR in Blacklist', 'Conferma');
  };

  exportData = async () => {
    try {
      await this.api.exportPodPdrBlacklist(this.store.state.parsedFilters, `sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    }
  };

  disconnectedCallback() {
    this.store.reset();
  }

  render() {
    return <Host>
      <dashboard-base-filters storeKey={StoreKey.POD_PDR}></dashboard-base-filters>
      <div class="d-flex flex-row justify-content-end mb-3 mt-4">
        <b2w-button onB2wButtonClick={() => this.openNewPodPdrModal()}
                    type="primary"
                    custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
                    text="Aggiungi POD/PDR"></b2w-button>
        <b2w-button onB2wButtonClick={() => this.openBulkModalPodPdr()}
                    type="secondary"
                    custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
                    text="Import massivo"></b2w-button>
        <b2w-button onB2wButtonClick={() => this.openEditModalPodPdr()} type="secondary"
                    disabled={this.store.state?.selectedRows.length === 0}
                    custom-style=".B2wButton{width: 240px !important;}"
                    text="Modifica data cancellazione"></b2w-button>
      </div>
      <dashboard-base-table
        storeKey={StoreKey.POD_PDR}
        isLoading={this.isLoading}
        payloadAction={{
          'align': 'center',
          'width': 10,
          'fixtoend': true,
          'actions': ['SHOW-USERS'],
          'customImages': [{ 'action': 'SHOW-USERS', 'icon': 'icon-b2w-users', 'color': 'color-accent' }],
        }}
        exportFn={this.exportData}
      ></dashboard-base-table>
    </Host>;
  }
}
