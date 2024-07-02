import { BlacklistBaseInterface } from './blacklist-base.interface';

export interface BlacklistAbiCab extends BlacklistBaseInterface {
  code: string;
  type: "abi" | "cab";
}
