import { ApiImpl } from './ApiImpl';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistAbiCab } from '../interfaces/blacklist-abi-cab.interface';

export class AbiCabApi extends ApiImpl{

  constructor(backend: string) {
    super(backend);
  }

  public async getAbiCabBlacklist(payload?: any, queryParams?: string | null): Promise<DataTableInterface<BlacklistAbiCab>> {
    payload = { filters: payload || [] };
    let url = '/v1/abi-cab/search';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

  public async bulkUpdateAbiCab(payload?: any, queryParams?: string | null): Promise<any> {
    let url = '/v1/abi-cab/bulk-update';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

  public async addAbiCabInBlacklist(payload?: any, queryParams?: string | null): Promise<any> {
    let url = '/v1/abi-cab';
    if (queryParams) {
      url = url + '?' + queryParams;
    }
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

}