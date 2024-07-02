import { BlacklistBaseInterface } from './blacklist-base.interface';
import { BlacklistClienti } from './blacklist-clienti.interface';

export interface BlacklistPodPdrInterface extends BlacklistBaseInterface {
  code: string;
  type: "pod" | "pdr";
  clienti: BlacklistClienti[];
  tipo_inserimento: "manuale" | "automatico";
  causale: string;
  sequential_users_before_auto_entering_blacklist: number;
  is_blacklist_active: boolean;

}
