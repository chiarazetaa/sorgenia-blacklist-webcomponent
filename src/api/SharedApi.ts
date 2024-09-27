import { ApiImpl } from './ApiImpl';
import { TokenPayload } from '../store/shared.store';

export class SharedApi extends ApiImpl{

  constructor(backend: string, additionalHeaders:any) {
    super(backend, additionalHeaders);
  }

  public async getJwtPayload(): Promise<TokenPayload> {
    let url = '/v1/decode-jwt';
    return this.apiImpl.get(url, undefined, this.additionalHeaders).promise;
  }

}
