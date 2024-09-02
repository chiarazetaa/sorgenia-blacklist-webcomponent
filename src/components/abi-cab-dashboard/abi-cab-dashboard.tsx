import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { handleError, INTERNAL_EVENTS, MAIN_BUTTONS_STYLES, MODAL_EVENTS } from '../../utils/utils';
import { AbiCabApi } from '../../api/AbiCabApi';
import { openModal } from '../../services/modal-service';
import { getStore, StoreKey } from '../../store/shared.store';

@Component({
  tag: 'abi-cab-dashboard',
  styleUrl: 'abi-cab-dashboard.css',
  shadow: false,
})
export class AbiCabDashboard {
  store = getStore(StoreKey.ABI_CAB);
  @Prop() backendUrl: string;
  @Prop() additionalHeaders:any;
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
    this.api = new AbiCabApi(this.backendUrl, this.additionalHeaders);
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
      handleError(e);
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

  exportDataFn = (exportType: "csv" | "xls") => {
    return this.api.exportAbiCabBlacklist(this.store.state.parsedFilters, exportType, `sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
  };

  disconnectedCallback() {
    this.store.reset();
  }


  render() {
    return <Host>
      <dashboard-base-filters storeKey={StoreKey.ABI_CAB}></dashboard-base-filters>

      <div class="d-flex flex-row justify-content-end mb-5 mt-4">
        <div class="button-container">
          <b2w-button class="button-left" onB2wButtonClick={() => this.openNewModalAbiCab()}
                      type="icon-secondary"
                      icon-name="add"
                      customStyle={MAIN_BUTTONS_STYLES}
                      text="Aggiungi ABI/CAB"></b2w-button>
          <div class="divider"></div>
          <b2w-button class="button-right" onB2wButtonClick={() => this.openEditModalAbiCab()} type="icon-secondary"
                      icon-name="edit"
                      disabled={this.store.state?.selectedRows.length === 0}
                      customStyle={MAIN_BUTTONS_STYLES}
                      text="Modifica data cancellazione"></b2w-button>
        </div>
      </div>

      <dashboard-base-table
        storeKey={StoreKey.ABI_CAB}
        isLoading={this.isLoading}
        exportFn={this.exportDataFn}
      ></dashboard-base-table>
    </Host>;

  }
}
