import { Component, Host, h, Prop } from '@stencil/core';
import { customersFields } from '../../fields/customers-fields';
import { filterOperators } from '../../fields/filter-operators';
import { StoreKeys, getStore, ObservableMapValue } from '../../store/shared.store';
import { debounce } from '../../utils/utils';

@Component({
  tag: 'dashboard-base-filters',
  styleUrl: 'dashboard-base-filters.css',
  shadow: false,
})
export class DashboardBaseFilters {
  store: ObservableMapValue

  @Prop() storeKey: StoreKeys;

  componentWillLoad() {
    this.store = getStore(this.storeKey);
  }

  setFilters = (filters) => {
    this.store.state.filters = filters;
  }

  showAndHideColumns = (keys: string[]) => {
    this?.store?.state?.visibleColumns.forEach(el => el.visible = keys.includes(el.field));
    this.store.state.visibleColumns = [...this.store.state.visibleColumns];
  };

  showAndHideColumnsDebounced = debounce(this.showAndHideColumns, 1000);

  render() {
    return (
      <Host>
        <div class="filter-wrapper d-flex flex-row w-100 b2w-justify-content-between align-items-center">
          <b2w-filter
            payloadFilters={JSON.stringify({
              label: 'Filtra',
              placeholder: 'Seleziona un campo',
              labeladdfilter: 'Aggiungi filtri',
              labelclearall: 'Annulla filtri',
              fields: customersFields,
              operators: filterOperators,
            })}
            onB2wFilterEvent={e => {
              this.setFilters(e.detail.ruleFilters)
            }}
            customStyle={'.B2wFilter{max-width:100% !important; width: 700px !important;}'}
          ></b2w-filter>
          <b2w-multiselect
            tagType="secondary"
            label="Visibilità campi"
            placeholder="Seleziona le colonne"
            enableSearch={true}
            defaultValues={JSON.stringify([...this.store.state.visibleColumns.filter(d => (d.visible)).map(d => (d.field))])}
            options={JSON.stringify(this?.store?.state?.visibleColumns.map(d => ({ text: d.text, value: d.field })))}
            onb2wMultiselectChange={e => this.showAndHideColumnsDebounced(e.detail.values)}
            customStyle={'.b2w-multiselect{max-width:100% !important; width: 300px !important; font-size: 14px !important}'}
          ></b2w-multiselect>
        </div>
      </Host>
    );
  }

}
