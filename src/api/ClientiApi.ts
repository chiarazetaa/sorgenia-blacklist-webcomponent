import { ApiImpl } from './ApiImpl';
import { DataTableInterface } from '../interfaces/data-table.interface';
import { BlacklistClienti } from '../interfaces/blacklist-clienti.interface';
import { Method } from './Api';
import { getReadableDate } from '../utils/utils';

export class ClientiApi extends ApiImpl {

  constructor(backend: string, additionalHeaders?: any) {
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

  public async exportClientiBlacklist(filters?: any[], exportType: "xls" | "csv" = "csv", queryParams?: string | null): Promise<any> {
    const payload = { filters: filters || [], exportType };
    let url = '/v1/customers/search-and-export-csv';
    return this.apiImpl.download(this.composeQueryparams(url, queryParams), payload || {}, `Export-${getReadableDate(new Date())}.${exportType}`, Method.POST, this.additionalHeaders).promise;
  }

  public async getAdditionalCustomerData(crmId?: string | number, codiceCliente?: string): Promise<any> {
    if (!crmId && !codiceCliente) {
      return Promise.reject('crmId or codiceCliente is required');
    }
    let url = '/v1/customers/additional-crm-data';
    if (crmId && !codiceCliente) {
      url += `?crm_id=${crmId}`;
    }
    if (!crmId && codiceCliente) {
      url += `?codice_cliente=${codiceCliente}`;
    }
    if (crmId && codiceCliente) {
      url += `?crm_id=${crmId}&codice_cliente=${codiceCliente}`;
    }
    return this.apiImpl.get(url, undefined, this.additionalHeaders).promise;
  }

  public async addCustomerInBlacklist(payload?: any, queryParams?: string | null): Promise<any> {
    let url = '/v1/customers';
    return this.apiImpl.post(this.composeQueryparams(url, queryParams), payload || {}, this.additionalHeaders).promise;
  }

  public async isCustomerBlacklisted(fiscal_code: string, vat:string, crm_id:number): Promise<any>{
    let url = '/v1/customers/is-blacklisted';
    const payload = {}
    if(fiscal_code){
      payload['codice_fiscale'] = fiscal_code;
    }
    if(vat){
      payload['p_iva'] = vat;
    }
    if(crm_id){
      payload['crm_id'] = crm_id;
    }
    return this.apiImpl.post(url, payload || {}, this.additionalHeaders).promise;
  }

  public async editCustomerBlacklist(documentId: string, payload?: any): Promise<any> {
    let url = `/v1/customers/${documentId}`;
    return this.apiImpl.patch(url, payload || {}, this.additionalHeaders).promise;
  }

}
