export interface BlacklistAbiCab {
  _id: string;
  crm_id:string;
  causale: string;
  piva: string;
  data_inserimento:string;
  data_cancellazione:string;
  operatore_forzatura:string;
  _tipo_inserimento: "AUTOMATICO" | "MANUALE";
}
