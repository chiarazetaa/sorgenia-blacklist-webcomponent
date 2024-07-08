import { ApiImpl } from './ApiImpl';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistAbiCab } from '../interfaces/blacklist-abi-cab.interface';
import { Method } from './Api';

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

  public async exportAbiCabBlacklist(payload?: any, queryParams?: string | null): Promise<any> {
    payload = { filters: payload || [] };
    let url = '/v1/abi-cab/search-and-export-csv';
    return this.apiImpl.download(this.composeQueryparams(url, queryParams), payload || {}, `Export-${new Date().toISOString()}.csv`, this.additionalHeaders).promise;
  }

  public async downloadTemplate(): Promise<any> {
    let url = '/v1/abi-cab/bulk-template';
    return this.apiImpl.download(url, undefined, `Template import massivo CLIENTI.csv`, Method.GET, this.additionalHeaders).promise;
  }

  public async uploadTemplateAndDownloadResult(file:File): Promise<any> {
    let url = '/v1/abi-cab/bulk-insert';
    let formData = new FormData();
    formData.append('file', file);
    return this.apiImpl.upload(url, formData, this.additionalHeaders).promise;
  }

}
