import { ApiImpl } from './ApiImpl';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistClienti } from '../interfaces/blacklist-clienti.interface';

export class ClientiApi extends ApiImpl{

  constructor(backend: string) {
    super(backend);
  }

  public async getClientiBlacklist(payload?: any, queryParams?: string | null): Promise<DataTableInterface<BlacklistClienti>> {
    payload = { filters: payload || [] };
    let url = '/v1/customers/search';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

  public async bulkUpdateClienti(payload?: any, queryParams?: string | null): Promise<any> {
    let url = '/v1/customers/bulk-update';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

  public async addClientiInBlacklist(payload?: any, queryParams?: string | null): Promise<any> {
    let url = '/v1/customers';
    if (queryParams) {
      url = url + '?' + queryParams;
    }
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

}
