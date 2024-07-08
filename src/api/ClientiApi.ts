import { ApiImpl } from './ApiImpl';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistClienti } from '../interfaces/blacklist-clienti.interface';
import { Method } from './Api';

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

  public async exportClientiBlacklist(payload?: any, queryParams?: string | null): Promise<any> {
    payload = { filters: payload || [] };
    let url = '/v1/customers/search-and-export-csv';
    return this.apiImpl.download(this.composeQueryparams(url, queryParams), payload || {}, `Export-${new Date().toISOString()}.csv`, this.additionalHeaders).promise;
  }

  public async downloadTemplate(): Promise<any> {
    let url = '/v1/customers/bulk-template';
    return this.apiImpl.download(url, undefined, `Template import massivo CLIENTI.csv`, Method.GET, this.additionalHeaders).promise;
  }

  public async uploadTemplateAndDownloadResult(file:File): Promise<any> {
    let url = '/v1/customers/bulk-insert';
    let formData = new FormData();
    formData.append('file', file);
    return this.apiImpl.upload(url, formData, this.additionalHeaders).promise;
  }

}
