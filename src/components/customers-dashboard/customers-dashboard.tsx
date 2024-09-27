import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import { handleError, INTERNAL_EVENTS, MAIN_BUTTONS_STYLES, MODAL_EVENTS } from '../../utils/utils';
import { openModal } from '../../services/modal-service';
import { ClientiApi } from '../../api/ClientiApi';
import { getStore, StoreKey } from '../../store/shared.store';
import { CustomerRow } from '../single-customer-dashboard/single-customer-dashboard';
import { canEditRecords } from '../../services/permission-service';

@Component({
  tag: 'customers-dashboard',
  styleUrl: 'customers-dashboard.css',
  shadow: false,
})
export class CustomersDashboard {
  store = getStore(StoreKey.CUSTOMERS);
  @Prop() backendUrl: string;
  @Prop() additionalHeaders:any;
  @State() isLoading: boolean;
  api: ClientiApi;

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    if ([MODAL_EVENTS.HIDE_AND_REFRESH].includes(event.detail.type)) {
      this.loadData();
    }
  }

  @Listen('tableActionEvent', { target: 'window' })
  handleTableActionEvent(event: { detail: { type: string, data: any } }) {
    switch (event.detail.type.toUpperCase()) {
      case 'EDIT-SINGLE-CUSTOMER':
        this.openEditCustomerModal(event.detail.data as CustomerRow);
        break;
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
    this.api = new ClientiApi(this.backendUrl, this.additionalHeaders);
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
      handleError(e);
    } finally {
      this.isLoading = false;
    }
  }

  exportDataFn = (exportType: "csv" | "xls") => {
    return this.api.exportClientiBlacklist(this.store.state.parsedFilters, exportType, `sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
  };

  openEditCustomerModal = (customerRow: CustomerRow) => {
    const component = <edit-customer-modal api={this.api}
                                           customerBlacklistRow={customerRow}></edit-customer-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, `Modifica blacklist ${customerRow.nome || ''} ${customerRow.cognome || ''} `, 'Conferma');
  };

  openEditModalClienti = () => {
    const component = <edit-customers-date-only-modal api={this.api}
                                            documentIds={this.store.state.selectedRows.map(sr => sr._id)}></edit-customers-date-only-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', 'Conferma');
  };

  disconnectedCallback() {
    this.store.reset();
  }

  render() {
    return <Host>
      <dashboard-base-filters storeKey={StoreKey.CUSTOMERS}></dashboard-base-filters>

      <div class="d-flex flex-row justify-content-end mb-3 mt-4">
        {canEditRecords() && <div class="button-container">
            <b2w-button onB2wButtonClick={() => this.openEditModalClienti()}
                        type="icon-secondary"
                        class="button-center"
                        icon-name="edit"
                        disabled={this.store.state.selectedRows.length === 0}
                        customStyle={MAIN_BUTTONS_STYLES}
                        text="Modifica data cancellazione"></b2w-button>
        </div>}
      </div>

      <dashboard-base-table
        storeKey={StoreKey.CUSTOMERS}
        isLoading={this.isLoading}
        customFormatters={{
          'crm_id': (cell) => `<a target="_blank" href="/web#id=${cell.getValue()}&model=res.partner">${cell.getValue()}</a>`
        }}
        payloadAction={{
          'align': 'center',
          'width': 100,
          'fixtoend': true,
          'actions': canEditRecords() ? ['EDIT-SINGLE-CUSTOMER'] : [],
          'customImages': [{ 'action': 'EDIT-SINGLE-CUSTOMER', 'icon': 'icon-b2w-edit', 'color': 'color-accent' }],
        }}
        exportFn={this.exportDataFn}
      ></dashboard-base-table>

    </Host>;
  }

}
