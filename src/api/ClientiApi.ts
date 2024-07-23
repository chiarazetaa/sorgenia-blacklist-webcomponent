import { ApiImpl } from './ApiImpl';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistClienti } from '../interfaces/blacklist-clienti.interface';
import { Method } from './Api';

export class ClientiApi extends ApiImpl{

  constructor(backend: string, additionalHeaders?:any) {
    super(backend, additionalHeaders);
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

  public async exportClientiBlacklist(payload?: any, queryParams?: string | null): Promise<any> {
    payload = { filters: payload || [] };
    let url = '/v1/customers/search-and-export-csv';
    return this.apiImpl.download(this.composeQueryparams(url, queryParams), payload || {}, `Export-${new Date().toISOString()}.csv`,  Method.POST, this.additionalHeaders).promise;
  }

  public async getAdditionalCustomerData(crmId): Promise<any> {
    let url = '/v1/customers/additional-crm-data/' + crmId;
    return this.apiImpl.get(url, undefined, this.additionalHeaders).promise;
  }

  public async addCustomerInBlacklist(payload?: any, queryParams?: string | null): Promise<any> {
    let url = '/v1/customers';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

  public async editCustomerBlacklist(documentId:string, payload?: any): Promise<any> {
    let url = `/v1/customers/${documentId}`;
    return this.apiImpl.patch(url, payload || {}, this.additionalHeaders).promise;
  }

}
