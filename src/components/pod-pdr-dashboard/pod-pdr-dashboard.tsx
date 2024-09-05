import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { handleError, INTERNAL_EVENTS, MAIN_BUTTONS_STYLES, MODAL_EVENTS } from '../../utils/utils';
import { PodPdrApi } from '../../api/PodPdrApi';
import { openModal } from '../../services/modal-service';
import { getStore, StoreKey } from '../../store/shared.store';
import { CustomerRow } from '../single-customer-dashboard/single-customer-dashboard';

@Component({
  tag: 'pod-pdr-dashboard',
  styleUrl: 'pod-pdr-dashboard.css',
  shadow: false,
})
export class PodPdrDashboard {
  store = getStore(StoreKey.POD_PDR);
  @Prop() backendUrl: string;
  @Prop() additionalHeaders:any;
  @State() isLoading: boolean;
  api: PodPdrApi;

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



  @Listen('tableActionEvent', { target: 'window' })
  handleTableActionEvent(event: {detail:{type:string, data: any}}) {
    switch (event.detail.type.toUpperCase()) {
      case 'SHOW-USERS':
        const component = <show-customers-pod-pdr-modal customerRequestingActivation={event?.detail?.data?.last_customer_requesting_activation} customers={event.detail.data.clienti}></show-customers-pod-pdr-modal>;
        openModal(component, undefined, '', undefined, 'Esci');
        break;
      case 'EDIT-SINGLE-POD-PDR':
        this.openEditSingleRowModalPodPdr(event.detail.data as CustomerRow);
        break;
    }
  }

  componentWillLoad() {
    this.api = new PodPdrApi(this.backendUrl, this.additionalHeaders);
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    try {
      const {
        data: newData,
        total_items,
      } = await this.api.getPodPdrBlacklist(this.store.state.parsedFilters, `skip=${(this.store.state.currentPage - 1) * this.store.state.limit}&limit=${this.store.state.limit}&sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
      this.store.state.tableData = { data: [...newData], total_items };

    } catch (e) {
      handleError(e);
    } finally {
      this.isLoading = false;
    }
  }

  openEditModalPodPdr = () => {
    const component = <edit-pod-pdr-date-only-modal api={this.api}
                                          documentIds={this.store.state.selectedRows.map(sr => sr._id)}></edit-pod-pdr-date-only-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', 'Conferma');
  };

  openEditSingleRowModalPodPdr = (customerRow: CustomerRow) => {
    const component = <edit-pod-pdr-date-only-modal api={this.api}
                                          documentIds={[customerRow._id]}></edit-pod-pdr-date-only-modal>;
    openModal(component, MODAL_EVENTS.SAVE_EDIT, 'Modifica data cancellazione', 'Conferma');
  };

  openNewPodPdrModal = () => {
    const component = <new-pod-pdr-modal api={this.api}></new-pod-pdr-modal>;
    openModal(component, MODAL_EVENTS.SAVE_NEW, 'Aggiungi POD/PDR in Blacklist', 'Conferma');
  };

  openBulkModalPodPdr = () => {
    const component = <bulk-pod-pdr-modal api={this.api}></bulk-pod-pdr-modal>;
    openModal(component, MODAL_EVENTS.SAVE_NEW, 'Import massivo POD/PDR in Blacklist', 'Conferma');
  };

  exportDataFn = (exportType: "csv" | "xls") => {
    return this.api.exportPodPdrBlacklist(this.store.state.parsedFilters, exportType, `sort=${this.store.state.sortField}%20${this.store.state.sortDirection}`);
  };

  disconnectedCallback() {
    this.store.reset();
  }

  render() {
    return <Host>
      <dashboard-base-filters storeKey={StoreKey.POD_PDR}></dashboard-base-filters>
      <div class="d-flex flex-row justify-content-end mb-5 mt-4">
        <div class="button-container">
          <b2w-button class="button-left" onB2wButtonClick={() => this.openNewPodPdrModal()}
                      type="icon-secondary"
                      icon-name="add"
                      customStyle={MAIN_BUTTONS_STYLES}
                      text="Aggiungi POD/PDR"></b2w-button>
          <div class="divider"></div>
          <b2w-button class="button-center" onB2wButtonClick={() => this.openBulkModalPodPdr()}
                      type="icon-secondary"
                      icon-name="exportmodel"
                      customStyle={MAIN_BUTTONS_STYLES}
                      text="Import massivo"></b2w-button>
          <div class="divider"></div>
          <b2w-button class="button-right" onB2wButtonClick={() => this.openEditModalPodPdr()} type="icon-secondary"
                      icon-name="edit"
                      disabled={this.store.state?.selectedRows.length === 0}
                      customStyle={ MAIN_BUTTONS_STYLES}
                      text="Modifica data cancellazione"></b2w-button>
        </div>
      </div>
      <dashboard-base-table
        storeKey={StoreKey.POD_PDR}
        isLoading={this.isLoading}
        customFormatters={{
          'p_iva': (cell) => cell.getValue() || '-'
        }}
        payloadAction={{
          'align': 'center',
          'width': 100,
          'fixtoend': true,
          'actions': ['SHOW-USERS', 'EDIT-SINGLE-POD-PDR'],
          'customImages': [
            { 'action': 'EDIT-SINGLE-POD-PDR', 'icon': 'icon-b2w-edit', 'color': 'color-accent' },
            { 'action': 'SHOW-USERS', 'icon': 'icon-b2w-users', 'color': 'color-accent' },
          ],
        }}
        exportFn={this.exportDataFn}
      ></dashboard-base-table>
    </Host>;
  }
}
