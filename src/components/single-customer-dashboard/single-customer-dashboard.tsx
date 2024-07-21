import { Component, Host, h, Prop, State, Listen } from '@stencil/core';
import { ClientiApi } from '../../api/ClientiApi';
import { INTERNAL_EVENTS, MAIN_BUTTONS_STYLES, MODAL_EVENTS } from '../../utils/utils';
import { showSnackbar } from '../../services/snackbar-service';
import { openModal } from '../../services/modal-service';
import { getStore, StoreKey } from '../../store/shared.store';

@Component({
  tag: 'single-customer-dashboard',
  styleUrl: 'single-customer-dashboard.css',
  shadow: false,
})
export class SingleCustomerDashboard {
  store = getStore(StoreKey.CUSTOMERS);
  @Prop() backendUrl: string;
  @State() isLoading: boolean;
  @Prop() crmId: string;
  api: ClientiApi;


  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    if ([MODAL_EVENTS.HIDE_AND_REFRESH].includes(event.detail.type)) {
      this.loadData();
    }
  }

  @Listen(INTERNAL_EVENTS.REFRESH_DATA, { target: 'window' })
  reloadDataHandler() {
    if (!this.api) {
      return;
    }
    this.loadData();
  }

  @Listen('tableActionEvent', { target: 'window' })
  handleTableActionEvent(event: { detail: { type: string, data: any } }) {
    switch (event.detail.type.toUpperCase()) {
      case 'EDIT-CUSTOMER':
        this.openEditCustomerModal(event.detail.data as CustomerRow);
        break;
    }
  }

  componentWillLoad() {
    this.api = new ClientiApi(this.backendUrl);
    this.store.state.filters = [{ key: 'crm_id', operator: '=', value: parseInt(this.crmId) }];
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

  openEditCustomerModal = (customerRow: CustomerRow) => {
    const component = <edit-customer-modal api={this.api}
                                           customerBlacklistRow={customerRow}></edit-customer-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, `Modifica blacklist ${customerRow.nome || ''} ${customerRow.cognome || ''} `, 'Conferma');
  };

  openNewCustomerModal = () => {
    // TODO add customer only if is not already in the blacklist
    const component = <add-customer-modal api={this.api} crm-id={this.crmId}></add-customer-modal>;
    openModal(component, MODAL_EVENTS.SAVE_NEW, 'Aggiungi Cliente in Blacklist', 'Conferma');
  };

  openEditCustomerDateOnlyModal = () => {
    const component = <edit-customer-date-only-modal api={this.api}
                                                     documentIds={this.store.state.selectedRows.map(sr => sr._id)}></edit-customer-date-only-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', 'Conferma');
  };

  render() {
    return <Host>
      <div class="d-flex flex-row justify-content-end mb-3 mt-4">
        <div class="button-container">
          <b2w-button class="button-left" onB2wButtonClick={() => this.openNewCustomerModal()}
                      type="icon-secondary"
                      icon-name="add"
                      customStyle={MAIN_BUTTONS_STYLES}
                      text="Aggiungi CLIENTE"></b2w-button>
          <div class="divider"></div>
          <b2w-button class="button-right" onB2wButtonClick={() => this.openEditCustomerDateOnlyModal()}
                      type="icon-secondary"
                      icon-name="edit"
                      disabled={this.store.state?.selectedRows.length === 0}
                      customStyle={MAIN_BUTTONS_STYLES}
                      text="Modifica data cancellazione"></b2w-button>
        </div>
      </div>

      <dashboard-base-table
        storeKey={StoreKey.CUSTOMERS}
        isLoading={this.isLoading}
        payloadAction={{
          'align': 'center',
          'width': 100,
          'fixtoend': true,
          'actions': ['EDIT-CUSTOMER'],
          'customImages': [{ 'action': 'EDIT-CUSTOMER', 'icon': 'icon-b2w-edit', 'color': 'color-accent' }],
        }}
        exportFn={this.exportData}
      ></dashboard-base-table>
    </Host>;
  }

}

interface UpdateHistory {
  updated_at: string;
  updated_by: string;
  updated_fields: any;
}

export interface CustomerRow {
  update_history: UpdateHistory[];
  created_at: string;
  codice_cliente: string;
  causale: string;
  data_inserimento: string;
  crm_id: number;
  codice_fiscale: string | null;
  nome: string | null;
  cognome: string | null;
  p_iva: string;
  tipo_inserimento: 'manuale' | 'automatico';
  _id: string;
  data_cancellazione: string;
  operatore_forzatura: string;
}
