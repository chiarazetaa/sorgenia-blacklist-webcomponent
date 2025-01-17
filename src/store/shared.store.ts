import { createStore, ObservableMap } from '@stencil/store';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistClienti } from '../interfaces/blacklist-clienti.interface';
import { BlacklistPodPdrInterface } from '../interfaces/blacklist-pod-pdr.interface';
import { BlacklistAbiCab } from '../interfaces/blacklist-abi-cab.interface';
import { INTERNAL_EVENTS } from '../utils/utils';

export interface StorePayload {
  filters: any[];
  parsedFilters: any[];
  visibleColumns?: any[];
  sortField: string;
  sortDirection: 'asc' | 'desc';
  currentPage:number
  limit: number;
  selectedRows: any[];
}

export interface TokenPayload {
  session_state?: string;
  acr?: string;
  allowed_origins?: string[];
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [key: string]: {
      roles: string[];
    };
  };
  scope?: string;
  email_verified?: boolean;
  role?: string[];
  name?: string;
  groups?: string[];
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
}

export interface StorePayloadWithData<T> extends StorePayload{
  tableData: DataTableInterface<T>;
}

const baseBlacklistFields: StorePayload = {
  filters: [],
  parsedFilters: [],
  visibleColumns: [],
  sortField: "created_at",
  sortDirection: 'desc',
  currentPage: 1,
  limit: 10,
  selectedRows: []
}

export interface SharedStore {
  tokenPayload?: TokenPayload;
  canEditRecords?: boolean;
  canShowRecords?: boolean;
}

const sharedStore = createStore<SharedStore>({});

const customerStore = createStore<StorePayloadWithData<BlacklistClienti>>({
  ...baseBlacklistFields,
  tableData: { data: [], total_items: 2 }
});

const podPdrStore = createStore<StorePayloadWithData<BlacklistPodPdrInterface>>({
  ...baseBlacklistFields,
  tableData: { data: [], total_items: 2 }
});

const abiCabStore = createStore<StorePayloadWithData<BlacklistAbiCab>>({
  ...baseBlacklistFields,
  tableData: { data: [], total_items: 2 }
});

const stores = [customerStore, podPdrStore, abiCabStore];
stores.forEach(store=> {
  store.onChange('filters', (filters) => {
    const parsedFilters = []
    const newFilters = filters || []
    newFilters.forEach(filter => {
      if(Array.isArray(filter.value) && filter.operator !== 'in'){
        filter.value.forEach(value => {
          parsedFilters.push({ key: filter.key, operator: filter.operator, value });
        });
      } else {
        parsedFilters.push(filter);
      }
    });
    store.state.parsedFilters = [...parsedFilters];
  });
  const refreshOnFieldChange: (keyof StorePayloadWithData<BlacklistClienti>)[] = ['parsedFilters', 'sortDirection', 'currentPage', 'limit'];
  refreshOnFieldChange.forEach(key => {
    store.onChange(key, () => {
      window.dispatchEvent(new CustomEvent(INTERNAL_EVENTS.REFRESH_DATA, {}));
    });
  })

})

export const StoreKey = {
  CUSTOMERS: 'customers',
  ABI_CAB: 'abi-cab',
  POD_PDR: 'pod-pdr',
} as const;

export type StoreKeys = typeof StoreKey[keyof typeof StoreKey]

export type ObservableMapValue =
  | ObservableMap<StorePayloadWithData<BlacklistClienti>>
  | ObservableMap<StorePayloadWithData<BlacklistPodPdrInterface>>
  | ObservableMap<StorePayloadWithData<BlacklistAbiCab>>

// @ts-ignore
const storeMap: Map<StoreKeys, ObservableMapValue> = new Map([[StoreKey.CUSTOMERS, customerStore], [StoreKey.POD_PDR, podPdrStore], [StoreKey.ABI_CAB, abiCabStore]]);

const getStore = (key: StoreKeys): ObservableMapValue | undefined => storeMap.get(key);
const getSharedStore = (): ObservableMap<SharedStore> => sharedStore;

export { getSharedStore, getStore };




