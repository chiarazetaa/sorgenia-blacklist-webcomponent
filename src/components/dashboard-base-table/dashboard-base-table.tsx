import { Component, Host, h, Prop } from '@stencil/core';
import { TABLE_STYLES } from '../../utils/utils';
import { getStore, ObservableMapValue, StoreKeys } from '../../store/shared.store';
import { Event, EventEmitter } from '@stencil/core';
import { tableFieldsMapping } from '../../fields/table-fields-mapping';

@Component({
  tag: 'dashboard-base-table',
  styleUrl: 'dashboard-base-table.css',
  shadow: false,
})
export class DashboardBaseTable {

  store: ObservableMapValue

  @Prop() storeKey: StoreKeys;
  @Prop() payloadAction: any;
  @Prop() isLoading: boolean;
  @Prop() exportFn: () => void;
  @Event() tableActionEvent: EventEmitter<{type:string, data: any}>;

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
          <div class="my-3 d-flex w-full justify-content-end">
            <b2w-button onB2wButtonClick={this.exportFn} type="icon-secondary"
                        iconName="download"
                        custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
                        text="Download"></b2w-button>
          </div>
        </div>
        }
          <div class="d-flex w-100 justify-content-center b2w-align-items-center">
            <b2w-pagination
              labelPreview="Prec"
              labelNext="Succ"
              class="w-full justify-center"
              totalPages={this.store.state.tableData?.total_items ? Math.ceil(this.store.state.tableData?.total_items / this.store.state.limit) : 0}
              currentPageDefault={this.store.state.currentPage}
              onB2wPaginationEvent={e => this.handlePaginationEvent(e.detail.currentPage)}
            />
          </div>
      </Host>
    );
  }

}
