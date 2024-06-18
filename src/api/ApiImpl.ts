import Api from './Api';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistAbiCab } from '../interfaces/blacklist-abi-cab.interface';

export class ApiImpl {

  public async getAbiCabBlacklist(payload?: any, queryParams?: string | null, authToken?: string | null): Promise<DataTableInterface<BlacklistAbiCab>> {
    payload = { filters: payload || [] };
    let additionalHeaders = authToken ? { authorization: 'Bearer ' + authToken } : null;
    let url = '/v1/search-abi-cab';
    if (queryParams) {
      url = url + '?' + queryParams;
    }
    return this.apiImpl.post(url, payload || {}, additionalHeaders).promise;
  }

  public async bulkUpdateAbiCab(payload?: any, queryParams?: string | null, authToken?: string | null): Promise<any> {
    let additionalHeaders = authToken ? { authorization: 'Bearer ' + authToken } : null;
    let url = '/v1/bulk-update-abi-cab';
    if (queryParams) {
      url = url + '?' + queryParams;
    }
    return this.apiImpl.post(url, payload || {}, additionalHeaders).promise;
  }

  public async addAbiCabInBlacklist(payload?: any, queryParams?: string | null, authToken?: string | null): Promise<any> {
    let additionalHeaders = authToken ? { authorization: 'Bearer ' + authToken } : null;
    let url = '/v1/abi-cab';
    if (queryParams) {
      url = url + '?' + queryParams;
    }
    return this.apiImpl.post(url, payload || {}, additionalHeaders).promise;
  }

  constructor(backend?: string) {
    this.apiImpl = new Api(backend);
  }

  private apiImpl = null;
}
