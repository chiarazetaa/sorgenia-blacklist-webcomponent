import Api from './Api';
export class ApiImpl {

  constructor(backend?: string, additionalHeaders?:any) {
    this.apiImpl = new Api(backend);
    if(additionalHeaders){
      this.additionalHeaders = {...JSON.parse(additionalHeaders)}
    }
  }

  protected composeQueryparams(originalUrl:string, queryParams?: string): string {
    if (queryParams) {
      originalUrl = originalUrl + '?' + queryParams;
    }
    return originalUrl
  }

  protected apiImpl = null;
  protected additionalHeaders = {}
}

