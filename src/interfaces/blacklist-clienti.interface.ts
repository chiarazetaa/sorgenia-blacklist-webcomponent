import { BlacklistBaseInterface } from './blacklist-base.interface';

export interface BlacklistClienti extends BlacklistBaseInterface {
  crm_id:string;
  codice_fiscale:string;
  p_iva:string;
  nome:string;
  cognome:string;
  codice_cliente: string;
  causale: string;
  piva: string;
  tipo_inserimento: "automatico" | "manuale";
}
