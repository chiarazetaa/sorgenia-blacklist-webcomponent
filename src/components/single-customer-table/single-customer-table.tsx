import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import { clientiFields } from '../../fields/clienti-fields';
import { DataTableInterface } from '../../interfaces/data-table.interface';
import { BlacklistClienti } from '../../interfaces/blacklist-clienti.interface';
import { ClientiApi } from '../../api/ClientiApi';
import { MODAL_EVENTS } from '../../utils/utils';
import { showSnackbar } from '../../services/snackbar-service';
import { openModal } from '../../services/modal-service';

@Component({
  tag: 'single-customer-table',
  styleUrl: 'single-customer-table.css',
  shadow: true,
})
export class SingleCustomerTable {
  @Prop() backendUrl: string;
  @Prop() odooId: string;
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
    this.filters= [{ key: 'codice_cliente', operator: "=", value: this.odooId }];
    this.loadData();
  }

  showAndHideColumns = (keys: string[]) => {
    this.visibleColumns.forEach(el => el.visible = keys.includes(el.field));
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

  openNewCustomerModal = () => {
    // TODO add customer only if is not already in the blacklist
    const component = <new-customer-modal api={this.api} crm-id={this.odooId}></new-customer-modal>;
    openModal(component, MODAL_EVENTS.SAVE_NEW, 'Aggiungi Cliente in Blacklist', 'Conferma');
  };

  openEditCustomerModal = () => {
    const component = <edit-customer-modal api={this.api}
                                            documentIds={this.selectedRows.map(sr => sr._id)}></edit-customer-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', 'Conferma');
  };

  render() {
    return <Host>
      <div class="d-flex flex-row w-100 b2w-justify-content-between align-items-center">
        <div class="d-flex flex-row justify-content-end mb-3 mt-4">
          <b2w-button onB2wButtonClick={() => this.openNewCustomerModal()}
                      type="primary"
                      custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
                      text="Aggiungi Cliente"></b2w-button>
        </div>
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
            placeholder={'Nessun dato trovato'}
            payload-columns={JSON.stringify(this.visibleColumns)}
            payload-data={JSON.stringify(this.tableData.data)}
            layout={'fitColumns'}
            customStyle={``}
          ></b2w-table>
        </div>}
        <div class="my-3 d-flex justify-content-end">
          <b2w-button onB2wButtonClick={() => this.exportData()} type="icon-secondary"
                      iconName="download"
                      custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
                      text="Download"></b2w-button>
        </div>
    </Host>
  }

  }
