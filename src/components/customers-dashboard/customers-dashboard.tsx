import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import { INTERNAL_EVENTS, MODAL_EVENTS } from '../../utils/utils';
import { openModal } from '../../services/modal-service';
import { ClientiApi } from '../../api/ClientiApi';
import { showSnackbar } from '../../services/snackbar-service';
import { getStore, StoreKey } from '../../store/shared.store';

@Component({
  tag: 'customers-dashboard',
  styleUrl: 'customers-dashboard.css',
  shadow: false,
})
export class CustomersDashboard {
  store = getStore(StoreKey.CUSTOMERS);
  @Prop() backendUrl: string;
  @State() isLoading: boolean;
  api: ClientiApi;

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    if ([MODAL_EVENTS.HIDE_AND_REFRESH].includes(event.detail.type)) {
      this.loadData();
    }
  }

  @Listen(INTERNAL_EVENTS.REFRESH_DATA, { target: 'window' })
  reloadDataHandler() {
    if(!this.api){
      return
    }
    this.loadData();
  }

  componentWillLoad() {
    this.api = new ClientiApi(this.backendUrl);
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    try {
      const {
        data: newData,
        total_items,
      } = await this.api.getClientiBlacklist(this.store.state.parsedFilters, `skip=${(this.store.state.currentPage - 1) * this.store.state.limit}&limit=${this.store.state.limit}&sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
      this.store.state.tableData = { data: [...newData], total_items };
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  exportData = async () => {
    try {
      await this.api.exportClientiBlacklist(this.store.state.parsedFilters, `sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    }

  };

  openEditModalClienti = () => {
    const component = <edit-customers-modal api={this.api}
                                            documentIds={this.store.state.selectedRows.map(sr => sr._id)}></edit-customers-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', 'Conferma');
  };

  disconnectedCallback() {
    this.store.reset();
  }

  render() {
    return <Host>
      <dashboard-base-filters storeKey={StoreKey.CUSTOMERS}></dashboard-base-filters>

      <div class="d-flex flex-row justify-content-end mb-3 mt-4">
        <b2w-button onB2wButtonClick={() => this.openEditModalClienti()} type="secondary"
                    disabled={this.store.state.selectedRows.length === 0}
                    custom-style=".B2wButton{width: 240px !important;}"
                    text="Modifica data cancellazione"></b2w-button>
      </div>

      <dashboard-base-table
        storeKey={StoreKey.CUSTOMERS}
        isLoading={this.isLoading}
        exportFn={this.exportData}
      ></dashboard-base-table>

    </Host>;
  }

}
