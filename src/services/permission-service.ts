import { getSharedStore } from '../store/shared.store';

export const canEditRecords = () => {
  const sharedStore = getSharedStore();
  return sharedStore.state.tokenPayload.realm_access.roles.includes('Operatore Credito BL');
};

export const canShowRecords = () => {
  const sharedStore = getSharedStore();
  return sharedStore.state?.tokenPayload.realm_access?.roles?.some(value => ['Operatore Credito BL', 'Operatore Vendite BL'].includes(value));
};

