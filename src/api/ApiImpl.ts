import Api from './Api';
export class ApiImpl {

  constructor(backend?: string) {
    this.apiImpl = new Api(backend);
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
