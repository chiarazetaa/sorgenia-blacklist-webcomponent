import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import { DataTableInterface } from '../../interfaces/data-table.interface';
import { debounce, MODAL_EVENTS } from '../../utils/utils';
import { openModal } from '../../services/modal-service';
import { filterOperators } from '../../fields/filter-operators';
import { BlacklistClienti } from '../../interfaces/blacklist-clienti.interface';
import { clientiFields } from '../../fields/clienti-fields';
import { ClientiApi } from '../../api/ClientiApi';
import { showSnackbar } from '../../services/snackbar-service';

@Component({
  tag: 'customers-table',
  styleUrl: 'customers-table.css',
  shadow: false,
})
export class CustomersTable {
  @Prop() backendUrl: string;
  @State() isLoading: boolean = true;
  @State() tableData: DataTableInterface<BlacklistClienti>;
  @State() initialSortField = 'data_inserimento';
  @State() initialSortDirection: 'asc' | 'desc' = 'desc';
  @State() visibleColumns = clientiFields;
  @State() currentPage = 1;
  limit = 10;
  @State() filters = [];
  @State() sort: { field: string, direction: 'asc' | 'desc' } = {
    field: this.initialSortField,
    direction: this.initialSortDirection,
  };
  @State() selectedRows = [];
  api: ClientiApi;

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    if ([MODAL_EVENTS.HIDE_AND_REFRESH].includes(event.detail.type)) {
      this.loadData();
    }
  }

  componentWillLoad() {
    this.api = new ClientiApi(this.backendUrl);
    this.loadData();
  }

  showAndHideColumns = (keys: string[]) => {
    this.visibleColumns.forEach(el => el.visible = keys.includes(el.field));
    this.loadData();
  };

  showAndHideColumnsDebounced = debounce(this.showAndHideColumns, 1000);

  handlePaginationEvent = (currentPage) => {
    this.currentPage = currentPage;
    this.loadData();
  };

  async loadData() {
    this.isLoading = true;
    try{
      this.tableData = { data: [], total_items: 2 };
      this.tableData = await this.api.getClientiBlacklist(this.filters, `skip=${(this.currentPage - 1) * this.limit}&limit=${this.limit}&sort=${this.sort.field}%20${this.sort.direction}`);
    } catch (e) {
      showSnackbar(JSON.parse(e?.message)?.detail || 'Error');
    } finally {
      this.isLoading = false;
    }
  }


  handleSortingEvent = (e) => {
    this.sort = {
      field: e.field,
      direction: this.sort.field === e.field ? this.sort.direction === 'asc' ? 'desc' : 'asc' : 'asc',
    };
    this.initialSortDirection = this.sort.direction;
    this.initialSortField = this.sort.field;
    this.loadData();
  };

  handleFilterEvent = (filters) => {
    this.filters = filters.ruleFilters;
    this.loadData();
  };

  handleMultiSelect = (values) => {
    if (this.selectedRows.length === values.length) {
      return;
    }
    this.selectedRows = values;
  };

  exportData = () => {
    this.api.exportClientiBlacklist(this.filters, `sort=${this.sort.field}%20${this.sort.direction}`);
  };

  openEditModalClienti = () => {
    const component = <edit-customers-modal api={this.api}
                                            documentIds={this.selectedRows.map(sr => sr._id)}></edit-customers-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', 'Conferma');
  };

  render() {
    return <Host>
      <div class="d-flex flex-row w-100 b2w-justify-content-between align-items-center">
        <b2w-filter
          payloadFilters={JSON.stringify({
            label: 'Filtra',
            placeholder: 'Seleziona un campo',
            labeladdfilter: 'Aggiungi filtri',
            labelclearall: 'Annulla filtri',
            fields: clientiFields,
            operators: filterOperators,
          })}
          onB2wFilterEvent={e => {
            this.handleFilterEvent(e?.detail);
          }}
          customStyle={'.B2wFilter{max-width:100% !important; width: 800px !important;}'}
        ></b2w-filter>
        <b2w-multiselect
          tagType="secondary"
          label="Visibilità campi"
          placeholder="Seleziona le colonne"
          enableSearch={true}
          defaultValues={JSON.stringify([...this.visibleColumns.filter(d => (d.visible)).map(d => (d.field))])}
          options={JSON.stringify(this.visibleColumns.map(d => ({ text: d.text, value: d.field })))}
          onb2wMultiselectChange={e => this.showAndHideColumnsDebounced(e.detail.values)}
          customStyle={'.b2w-multiselect{max-width:100% !important; width: 300px !important; font-size: 14px !important}'}
        ></b2w-multiselect>
      </div>

      <div class="d-flex flex-row justify-content-end mb-3 mt-4">
        <b2w-button onB2wButtonClick={() => this.openEditModalClienti()} type="secondary"
                    disabled={this.selectedRows.length === 0}
                    custom-style=".B2wButton{width: 240px !important;}"
                    text="Modifica data cancellazione"></b2w-button>
      </div>


      {!this.tableData ? <b2w-spinner visible="true" fixed="false"></b2w-spinner> : <div>
        <b2w-table
          initialSortDirection={this.initialSortDirection}
          initialSortField={this.initialSortField}
          use-refresh-data={true}
          customFormatters={{
            'nome': (cell) => cell.getValue() || '-',
            'cognome': (cell) => cell.getValue() || '-',
            'p_iva': (cell) => cell.getValue() || '-',
          }}
          id={'clienti-table'}
          selectable={true}
          placeholder={'Nessun dato trovato'}
          payload-columns={JSON.stringify(this.visibleColumns)}
          payload-data={JSON.stringify(this.tableData.data)}
          layout={'fitColumns'}
          downloadFormat={'xlsx'}
          emitEventOnSorting={true}
          customStyle={``}
          onB2wHeaderSortEvent={e => this.handleSortingEvent(e.detail)}
          onB2wTableSelectionEvent={e => this.handleMultiSelect(e.detail.data)}
        ></b2w-table>
      </div>}
      <div class="my-3 d-flex justify-content-end">
        <b2w-button onB2wButtonClick={() => this.exportData()} type="icon-secondary"
                    iconName="download"
                    custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
                    text="Download"></b2w-button>
      </div>
      <div class="d-flex w-100 justify-content-end">
        <b2w-pagination
          class="w-full justify-center"
          totalPages={this.tableData?.total_items ? Math.ceil(this.tableData?.total_items / this.limit) : 0}
          currentPageDefault={this.currentPage}
          onB2wPaginationEvent={e => this.handlePaginationEvent(e.detail.currentPage)}
        />
      </div>
    </Host>;
  }

}
