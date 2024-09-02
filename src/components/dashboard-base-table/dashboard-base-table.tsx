import { Component, Host, h, Prop } from '@stencil/core';
import { TABLE_STYLES } from '../../utils/utils';
import { getStore, ObservableMapValue, StoreKeys } from '../../store/shared.store';
import { Event, EventEmitter } from '@stencil/core';
import { tableFieldsMapping } from '../../fields/table-fields-mapping';
import { openModal } from '../../services/modal-service';

@Component({
  tag: 'dashboard-base-table',
  styleUrl: 'dashboard-base-table.css',
  shadow: false,
})
export class DashboardBaseTable {

  store: ObservableMapValue;

  @Prop() storeKey: StoreKeys;
  @Prop() payloadAction: any;
  @Prop() isLoading: boolean;
  @Prop() exportFn: (exportType: 'csv' | 'xls') => void;
  @Event() tableActionEvent: EventEmitter<{ type: string, data: any }>;

  componentWillLoad() {
    this.store = getStore(this.storeKey);
    this.store.state.visibleColumns = [...tableFieldsMapping[this.storeKey]];
  }

  handleSortingEvent = (e) => {
    this.store.state.sortField = e.field;
    this.store.state.sortDirection = this.store.state.sortField === e.field ? this.store.state.sortDirection === 'asc' ? 'desc' : 'asc' : 'asc';
  };

  handlePaginationEvent = (currentPage) => {
    this.store.state.currentPage = currentPage;
  };

  openExportModal = () => {
    const component = <export-table-modal exportFn={this.exportFn}></export-table-modal>;
    openModal(component, undefined, 'Download risultati', undefined, 'Esci');
  }




  render() {
    return (
      <Host>
        {this.isLoading ? <shared-table-skeleton></shared-table-skeleton> : <div>
          <b2w-table
            initialSortDirection={this.store.state.sortDirection}
            initialSortField={this.store.state.sortField}
            use-refresh-data={true}
            customFormatters={{
              'p_iva': (cell) => cell.getValue() || '-',
              'last_customer_requesting_activation': (cell) => cell.getValue() || '-'
            }}
            id={'shared--table'}
            selectable={true}
            horizontalScroll={false}
            layout={'fitColumns'}
            paginationSize={this.store.state.limit}
            externalPagination={true}
            placeholder={'Nessun dato trovato'}
            payload-columns={JSON.stringify(this.store.state.visibleColumns)}
            payload-data={JSON.stringify(this.store.state.tableData?.data || [])}
            emitEventOnSorting={true}
            customStyle={TABLE_STYLES}
            payload-action={JSON.stringify(this.payloadAction)}
            onB2wHeaderSortEvent={e => this.handleSortingEvent(e.detail)}
            onB2wTableSelectionEvent={e => this.store.state.selectedRows = e.detail.data}
            onB2wTableActionEvent={e => {
              this.tableActionEvent.emit({ type: e.detail?.type, data: e.detail?.data });
            }}
          ></b2w-table>
        </div>
        }
        <div class="d-flex justify-content-between w-100 align-items-end mt-4">
          <div>
            <b2w-dropdown
              default-value={10}
              required={true}
              custom-style=".B2wDropdown{width: 110px !important} .b2w-dropdown-input{height:30px !important} .b2w-dropdown-required{display:none !important} .b2w-label-form-element{font-size:10px !important}"
              label="Elementi per pagina"
              onB2wDropdownChange={e => this.store.state.limit = e.detail.value}
              options={JSON.stringify([{ text: '10', value: 10 }, { text: '20', value: 20 }, {
                text: '50',
                value: 50,
              }, { text: '100', value: 100 }, { text: '200', value: 200 }])}
            ></b2w-dropdown>
          </div>
          <div>
            {this.store.state.tableData.total_items > 0 &&
              <div class="d-flex w-100 justify-content-center align-items-end">
                <b2w-pagination
                  labelPreview="Prec"
                  labelNext="Succ"
                  class="w-full justify-center"
                  totalPages={this.store.state.tableData?.total_items ? Math.ceil(this.store.state.tableData?.total_items / this.store.state.limit) : 0}
                  currentPageDefault={this.store.state.currentPage}
                  onB2wPaginationEvent={e => this.handlePaginationEvent(e.detail.currentPage)}
                />
              </div>}
          </div>
          <div style={{width: '170px'}}>
            {this.store.state.tableData.total_items > 0 && !this.isLoading &&
                <b2w-button onB2wButtonClick={this.openExportModal} type="icon-secondary"
                            iconName="download"
                            custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
                            text="Download"></b2w-button>
              }
          </div>
        </div>

      </Host>
    );
  }

}
