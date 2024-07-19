import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import { MODAL_EVENTS, TABLE_STYLES } from '../../utils/utils';
import { openModal } from '../../services/modal-service';
import { customersFields } from '../../fields/clienti-fields';
import { ClientiApi } from '../../api/ClientiApi';
import { showSnackbar } from '../../services/snackbar-service';
import { getStore, StoreKey } from '../../store/shared.store';

@Component({
  tag: 'customers-table',
  styleUrl: 'customers-table.css',
  shadow: false,
})
export class CustomersTable {
  store = getStore(StoreKey.CUSTOMERS);
  @Prop() backendUrl: string;
  @State() isLoading: boolean = true;
  api: ClientiApi;

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    if ([MODAL_EVENTS.HIDE_AND_REFRESH].includes(event.detail.type)) {
      this.loadData();
    }
  }

  componentWillLoad() {
    this.api = new ClientiApi(this.backendUrl);
    this.store.state.visibleColumns = customersFields;
    this.store.onChange("visibleColumns", () => {
      this.loadData();
    })
    this.store.onChange("parsedFilters", () => {
      this.loadData();
    })
    this.loadData();
  }

  handlePaginationEvent = (currentPage) => {
    this.store.state.currentPage = currentPage;
    this.loadData();
  };

  async loadData() {
    this.isLoading = true;
    try{
      const {data:newData, total_items } = await this.api.getClientiBlacklist(this.store.state.parsedFilters, `skip=${(this.store.state.currentPage - 1) * this.store.state.limit}&limit=${this.store.state.limit}&sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`)
      this.store.state.tableData = { data: [...newData], total_items };

    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    } finally {
      this.isLoading = false;
    }
  }

  handleSortingEvent = (e) => {
    this.store.state.sortField = e.field;
    this.store.state.sortDirection = this.store.state.sortField === e.field ? this.store.state.sortDirection === 'asc' ? 'desc' : 'asc' : 'asc';
    this.loadData();
  };

  exportData = () => {
    this.api.exportClientiBlacklist(this.store.state.parsedFilters, `sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
  };

  openEditModalClienti = () => {
    const component = <edit-customers-modal api={this.api}
                                            documentIds={this.store.state.selectedRows.map(sr => sr._id)}></edit-customers-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', 'Conferma');
  };

  render() {
    return <Host>
      <dashboard-base-filters storeKey={StoreKey.CUSTOMERS}></dashboard-base-filters>

      <div class="d-flex flex-row justify-content-end mb-3 mt-4">
        <b2w-button onB2wButtonClick={() => this.openEditModalClienti()} type="secondary"
                    disabled={this.store.state.selectedRows.length === 0}
                    custom-style=".B2wButton{width: 240px !important;}"
                    text="Modifica data cancellazione"></b2w-button>
      </div>


      {this.isLoading ? <shared-table-skeleton></shared-table-skeleton> : <div>
        <b2w-table
          initialSortDirection={this.store.state.sortDirection}
          initialSortField={this.store.state.sortField}
          use-refresh-data={true}
          customFormatters={{
            'p_iva': (cell) => cell.getValue() || '-',
          }}
          id={'customers-table'}
          selectable={true}
          placeholder={'Nessun dato trovato'}
          payload-columns={JSON.stringify(this.store.state.visibleColumns)}
          payload-data={JSON.stringify(this.store.state.tableData?.data || [])}
          emitEventOnSorting={true}
          customStyle={TABLE_STYLES}
          onB2wHeaderSortEvent={e => this.handleSortingEvent(e.detail)}
          onB2wTableSelectionEvent={e => this.store.state.selectedRows = e.detail.data}
        ></b2w-table>

        <div class="my-3 d-flex justify-content-end">
          <b2w-button onB2wButtonClick={() => this.exportData()} type="icon-secondary"
                      iconName="download"
                      custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
                      text="Download"></b2w-button>
        </div>
        <div class="d-flex w-100 justify-content-center b2w-align-items-center">
          <b2w-pagination
            class="w-full justify-center"
            totalPages={this.store.state.tableData?.total_items ? Math.ceil(this.store.state.tableData?.total_items / this.store.state.limit) : 0}
            currentPageDefault={this.store.state.currentPage}
            onB2wPaginationEvent={e => this.handlePaginationEvent(e.detail.currentPage)}
          />
        </div>
      </div>}

    </Host>
  }

}
