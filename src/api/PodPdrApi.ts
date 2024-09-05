import { ApiImpl } from './ApiImpl';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistPodPdrInterface } from '../interfaces/blacklist-pod-pdr.interface';
import { Method } from './Api';
import { getReadableDate } from '../utils/utils';

export class PodPdrApi extends ApiImpl {

  constructor(backend: string, additionalHeaders?:any) {
    super(backend, additionalHeaders);
  }

  public async getPodPdrBlacklist(payload?: any, queryParams?: string | null): Promise<DataTableInterface<BlacklistPodPdrInterface>> {
    payload = { filters: payload || [] };
    let url = '/v1/pod-pdr/search';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

  public async bulkUpdatePodPdr(payload?: any, queryParams?: string | null): Promise<any> {
    let url = '/v1/pod-pdr/bulk-update';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

  public async searchCodiceCliente(codiceCliente:string, queryParams?: string | null): Promise<any> {
    let url = `/v1/customers/additional-crm-data?codice_cliente=${codiceCliente}`;
    return this.apiImpl.get(this.composeQueryparams(url, queryParams), this.additionalHeaders).promise;
  }


  public async addPodPdrInBlacklist(payload?: any, queryParams?: string | null): Promise<any> {
    let url = '/v1/pod-pdr';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

  public async exportPodPdrBlacklist(filters?: any[], exportType: "xls" | "csv" = "csv", queryParams?: string | null): Promise<any> {
    const payload = { filters: filters || [], exportType };
    let url = '/v1/pod-pdr/search-and-export-csv';
    return this.apiImpl.download(this.composeQueryparams(url, queryParams), payload || {}, `Export-${getReadableDate(new Date())}.${exportType}`, Method.POST, this.additionalHeaders).promise;
  }

  public async downloadTemplate(): Promise<any> {
    let url = '/v1/pod-pdr/bulk-template';
    return this.apiImpl.download(url, undefined, `Template import massivo POD/PDR.csv`, Method.GET, this.additionalHeaders).promise;
  }

  public async uploadTemplateAndDownloadResult(file:File): Promise<any> {
    let url = '/v1/pod-pdr/bulk-insert';
    let formData = new FormData();
    formData.append('file', file);
    return this.apiImpl.upload(url, formData, this.additionalHeaders).promise;
  }

}


