import { ApiImpl } from './ApiImpl';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistPodPdrInterface } from '../interfaces/blacklist-pod-pdr.interface';

export class PodPdrApi extends ApiImpl{

  constructor(backend: string) {
    super(backend);
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
    let url = `/v1/customer/additional-crm-data/${codiceCliente}`;
    return this.apiImpl.get(this.composeQueryparams(url, queryParams), this.additionalHeaders).promise;
  }


  public async addPodPdrInBlacklist(payload?: any, queryParams?: string | null): Promise<any> {
    let url = '/v1/pod-pdr';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

}
