import { Component, h, Listen, Prop, State } from '@stencil/core';
import { DataTableInterface } from '../../interfaces/data-table.interface';
import { BlacklistAbiCab } from '../../interfaces/blacklist-abi-cab.interface';
import { abiCabFields } from '../../fields/abi-cab-fields';
import { ApiImpl } from '../../api/ApiImpl';
import { filterOperators } from '../../fields/filter-operators';
import { debounce, MODAL_EVENTS, SNACKBAR_EVENTS } from '../../utils/utils';
import { EditModalTemplate, openEditModal } from './components/OpenEditModal';
import { NewModalTemplate, openNewModal } from './components/OpenNewModal';

@Component({
  tag: 'abi-cab-table',
  styleUrl: 'abi-cab-table.css',
  shadow: false,
})
export class AbiCabTable {
  @Prop() backendUrl: string;
  @State() isLoading: boolean = true;
  @State() tableData: DataTableInterface<BlacklistAbiCab>;
  @State() initialSortField = 'id_crm';
  @State() initialSortDirection: 'asc' | 'desc' = 'asc';
  @State() visibleColumns = abiCabFields
  @State() currentPage = 1;
  limit = 10;
  @State() filters = [];
  @State() sort: { field: string, direction: 'asc' | 'desc' } = {
    field: this.initialSortField,
    direction: this.initialSortDirection,
  };
  @State() selectedRows = [];
  editModalTemplate: EditModalTemplate = {};
  newModalTemplate: NewModalTemplate = {};

  @Listen('modalEvent', { target: 'window' })
  changeContentHandler(event: CustomEvent) {
    switch (event.detail.type) {
      case MODAL_EVENTS.SAVE_EDIT_DATE:
        this.massiveDateUpdate();
        break;
      case MODAL_EVENTS.SAVE_NEW_ABI_CAB:
        this.addAbiCabInBlacklist();
        break;
    }
  }

  componentWillLoad() {
    this.loadData();
  }

  showAndHideColumns = (keys: string[]) => {
    this.visibleColumns.forEach(el=>el.visible = keys.includes(el.field));
    this.loadData();
  };

  showAndHideColumnsDebounced = debounce(this.showAndHideColumns, 1000);

  handlePaginationEvent = (currentPage) => {
    this.currentPage = currentPage;
    this.loadData();
  };

  async loadData() {
    this.isLoading = true;
    let api = new ApiImpl(this.backendUrl);
    this.tableData = { data: [], totalItems: 2 };
    this.tableData = await api.getAbiCabBlacklist(this.filters, `skip=${(this.currentPage - 1) * this.limit}&limit=${this.limit}&sort=${this.sort.field}%20${this.sort.direction}`);
    this.isLoading = false;
  }

  async addAbiCabInBlacklist() {
    window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, { detail: { type: MODAL_EVENTS.LOADING } }));
    let api = new ApiImpl(this.backendUrl);
    try {
      await api.addAbiCabInBlacklist(this.newModalTemplate);
      this.loadData();
      window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, { detail: { type: MODAL_EVENTS.HIDE } }));
    } catch (e) {
      window.dispatchEvent(new CustomEvent(SNACKBAR_EVENTS.ID, {
        detail: {
          type: SNACKBAR_EVENTS.SHOW,
          text: JSON.parse(e?.message)?.message || 'Error'
        },
      }));
    } finally {
      window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, { detail: { type: MODAL_EVENTS.EXIT_LOADING } }));
    }
  }

  async massiveDateUpdate() {
    window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, { detail: { type: MODAL_EVENTS.LOADING } }));
    let api = new ApiImpl(this.backendUrl);
    try {
      const payload = {
        document_ids: this.selectedRows.map(sr => sr._id),
        data_cancellazione: this.editModalTemplate.data_cancellazione,
      };
      await api.bulkUpdateAbiCab(payload);
      this.loadData();
      window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, { detail: { type: MODAL_EVENTS.HIDE } }));
    } catch (e) {
      window.dispatchEvent(new CustomEvent(SNACKBAR_EVENTS.ID, {
        detail: {
          type: SNACKBAR_EVENTS.SHOW,
          text: JSON.parse(e?.message)?.message || 'Error'
        },
      }));
    } finally {
      window.dispatchEvent(new CustomEvent(MODAL_EVENTS.ID, { detail: { type: MODAL_EVENTS.EXIT_LOADING } }));
    }
  };

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

  render() {
    return <div>
      <div class="d-flex flex-row w-100 b2w-justify-content-between align-items-center">
        <b2w-filter
          payloadFilters={JSON.stringify({
            label: 'Filtra',
            placeholder: 'Seleziona un campo',
            labeladdfilter: 'Aggiungi filtro',
            labelclearall: 'Annulla filtri',
            fields: abiCabFields,
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
        <b2w-button onB2wButtonClick={() => openNewModal(this.newModalTemplate)} type="primary"
                    custom-style=".B2wButton{width: 160px !important;margin-right:1rem;} "
                    text="Aggiungi POD/PDR"></b2w-button>
        <b2w-button onB2wButtonClick={() => openEditModal(this.editModalTemplate)} type="primary"
                    disabled={this.selectedRows.length === 0}
                    custom-style=".B2wButton{width: 240px !important;}"
                    text="Modifica data cancellazione"></b2w-button>
      </div>


      {!this.tableData ? <b2w-spinner visible="true" fixed="false"></b2w-spinner> : <div>
        <b2w-table
          initialSortDirection={this.initialSortDirection}
          initialSortField={this.initialSortField}
          use-refresh-data={true}
          id={'residential-table'}
          selectable={true}
          placeholder={'Nessun dato trovato'}
          payload-columns={JSON.stringify(this.visibleColumns)}
          payload-data={JSON.stringify(this.tableData.data)}
          horizontalScroll={false}
          showDownload={true}
          downloadFileName={'export-blacklist-abi-cab'}
          downloadButtonLabel={'Esporta'}
          downloadStyle={'icon-secondary'}
          downloadFormat={'xlsx'}
          emitEventOnSorting={true}
          customStyle={'.B2wTable{max-width:100% !important;}'}
          onB2wHeaderSortEvent={e => this.handleSortingEvent(e.detail)}
          onB2wTableSelectionEvent={e => this.handleMultiSelect(e.detail.data)}
        ></b2w-table>
      </div>}
      <div class="d-flex w-100 justify-content-end">
        <b2w-pagination
          class="w-full justify-center"
          totalPages={Math.ceil(this.tableData?.totalItems / this.limit)}
          currentPageDefault={this.currentPage}
          onB2wPaginationEvent={e => this.handlePaginationEvent(e.detail.currentPage)}
        />
      </div>
    </div>;

  }
}
