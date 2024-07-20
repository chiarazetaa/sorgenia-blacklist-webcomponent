import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { INTERNAL_EVENTS, MODAL_EVENTS } from '../../utils/utils';
import { AbiCabApi } from '../../api/AbiCabApi';
import { openModal } from '../../services/modal-service';
import { showSnackbar } from '../../services/snackbar-service';
import { getStore, StoreKey } from '../../store/shared.store';

@Component({
  tag: 'abi-cab-dashboard',
  styleUrl: 'abi-cab-dashboard.css',
  shadow: false,
})
export class AbiCabDashboard {
  store = getStore(StoreKey.ABI_CAB);
  @Prop() backendUrl: string;
  @State() isLoading: boolean;
  api: AbiCabApi;

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
    this.api = new AbiCabApi(this.backendUrl);
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    try {
      const {
        data: newData,
        total_items,
      } = await this.api.getAbiCabBlacklist(this.store.state.parsedFilters, `skip=${(this.store.state.currentPage - 1) * this.store.state.limit}&limit=${this.store.state.limit}&sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
      this.store.state.tableData = { data: [...newData], total_items };
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  openEditModalAbiCab = () => {
    const component = <edit-abi-cab-modal api={this.api} documentIds={this.store.state.selectedRows.map(sr => sr._id)}></edit-abi-cab-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', "Conferma");
  };

  openNewModalAbiCab = () => {
    const component = <new-abi-cab-modal api={this.api}></new-abi-cab-modal>;
    openModal(component, MODAL_EVENTS.SAVE_NEW, 'Aggiungi ABI/CAB in Blacklist', "Conferma");
  };

  exportData = async () => {
    try {
      await this.api.exportAbiCabBlacklist(this.store.state.parsedFilters, `sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    }
  }

  disconnectedCallback() {
    this.store.reset();
  }


  render() {
    return <Host>
      <dashboard-base-filters storeKey={StoreKey.ABI_CAB}></dashboard-base-filters>

      <div class="d-flex flex-row justify-content-end mb-3 mt-4">
        <b2w-button onB2wButtonClick={() => this.openEditModalAbiCab()} type="secondary"
                    disabled={this.store.state.selectedRows.length === 0}
                    custom-style=".B2wButton{width: 240px !important;}"
                    text="Modifica data cancellazione"></b2w-button>
      </div>

      <dashboard-base-table
        storeKey={StoreKey.ABI_CAB}
        isLoading={this.isLoading}
        exportFn={this.exportData}
      ></dashboard-base-table>
    </Host>;

  }
}
