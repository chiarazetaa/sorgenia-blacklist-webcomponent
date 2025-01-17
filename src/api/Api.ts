export enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export default class Api {
  /**************************************************
   * CONSTRUCTOR
   **************************************************/

  constructor(backend: string) {
    this.baseUrl = backend;
  }

  /************************************************
   * PUBLIC FUNCTIONS
   ************************************************/
  public get<R>(
    path: string,
    query?: {
      [field: string]: string | number | boolean | null;
    },
    additionalHeaders?: { [key: string]: string },
  ): { controller: AbortController; promise: Promise<R> } {
    const controller = new AbortController();
    const signal = controller.signal;

    if (query) {
      let queryString = '';
      for (const field in query) {
        queryString += queryString ? '&' : '?';
        queryString += field + '=' + encodeURIComponent(String(query[field]));
      }
      path += queryString;
    }

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'origin': `${window.location.protocol}//${window.location.host}`,
    };

    if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

    return {
      controller,
      promise: fetch(this.getFullUrl(path), {
        signal: signal,
        credentials: 'include',
        headers,
      }).then(response => {
        if (response.ok) return response.json();
        let statusCode = response.status;
        return response.text().then(text => {
          this.errorParser(text, statusCode);
        });
      }),
    };
  }

  public post<T, R>(path: string, value: T, additionalHeaders?: { [key: string]: string }): {
    controller: AbortController;
    promise: Promise<R>
  } {
    const controller = new AbortController();
    const signal = controller.signal;

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'origin': `${window.location.protocol}//${window.location.host}`,
    };

    if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

    return {
      controller,
      promise: fetch(this.getFullUrl(path), {
        signal,
        method: Method.POST,
        credentials: 'include',
        headers,
        body: JSON.stringify(value),
      }).then(response => {
        if (response.ok) {
          return this.successParser(response);
        }
        let statusCode = response.status;
        return response.text().then(text => {
          this.errorParser(text, statusCode);
        });
      }),
    };
  }

  public patch<T, R>(path: string, value: T, additionalHeaders?: { [key: string]: string }): {
    controller: AbortController;
    promise: Promise<R>
  } {
    const controller = new AbortController();
    const signal = controller.signal;

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'origin': `${window.location.protocol}//${window.location.host}`,
    };

    if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

    return {
      controller,
      promise: fetch(this.getFullUrl(path), {
        signal,
        method: Method.PATCH,
        credentials: 'include',
        headers,
        body: JSON.stringify(value),
      }).then(response => {
        if (response.ok) {
          return this.successParser(response);
        }
        let statusCode = response.status;
        return response.text().then(text => {
          this.errorParser(text, statusCode);
        });
      }),
    };
  }

  public put<T, R>(path: string, value: T, additionalHeaders?: { [key: string]: string }): {
    controller: AbortController;
    promise: Promise<R>
  } {
    const controller = new AbortController();
    const signal = controller.signal;

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'origin': `${window.location.protocol}//${window.location.host}`,
    };

    if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

    return {
      controller,
      promise: fetch(this.getFullUrl(path), {
        signal,
        method: Method.PUT,
        credentials: 'include',
        headers,
        body: JSON.stringify(value),
      }).then(response => {
        if (response.ok) {
          return this.successParser(response);
        }
        let statusCode = response.status;
        return response.text().then(text => {
          this.errorParser(text, statusCode);
        });
      }),
    };
  }

  public delete<T, R>(path: string, value: T, additionalHeaders?: { [key: string]: string }): {
    controller: AbortController;
    promise: Promise<R>
  } {
    const controller = new AbortController();
    const signal = controller.signal;

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'origin': `${window.location.protocol}//${window.location.host}`,
    };

    if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

    return {
      controller,
      promise: fetch(this.getFullUrl(path), {
        signal,
        method: Method.DELETE,
        credentials: 'include',
        headers,
        body: JSON.stringify(value),
      }).then(response => {
        if (response.ok) {
          return this.successParser(response);
        }
        let statusCode = response.status;
        return response.text().then(text => {
          this.errorParser(text, statusCode);
        });
      }),
    };
  }

  public download(
    path: string,
    body: any,
    fileName: string,
    method = Method.POST,
    additionalHeaders?: { [key: string]: string },
  ): { controller: AbortController; promise: Promise<void> } {
    const controller = new AbortController();
    const signal = controller.signal;

    let headers = {
      'Content-Type': 'application/json',
      'Accept': '*',
      'origin': `${window.location.protocol}//${window.location.host}`,
    };

    if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

    return {
      controller,
      promise: fetch(this.getFullUrl(path), {
        signal: signal,
        credentials: 'include',
        headers,
        body: body ? JSON.stringify(body) : undefined,
        method: method,
      }).then(response => {
        if (!response.ok) return new Promise((_, reject) => new Response(response.body).json().then(errorResponse => reject(new Error(JSON.stringify(errorResponse)))));
        this.downloadAttachment(response, fileName);
      }),
    };
  }

  public upload(path: string, formaData: FormData, additionalHeaders?: { [key: string]: string }): {
    controller: AbortController;
    promise: Promise<{status: string}>
  } {
    const controller = new AbortController();
    const signal = controller.signal;

    let headers = {
      Accept: '*',
      origin: `${window.location.protocol}//${window.location.host}`,
    };

    if (additionalHeaders) for (let key in additionalHeaders) headers[key] = additionalHeaders[key];

    return {
      controller,
      promise: fetch(this.getFullUrl(path), {
        signal,
        method: Method.POST,
        credentials: 'include',
        headers,
        body: formaData,
      }).then(response => {
          if (!response.ok) return new Promise((_, reject) => new Response(response.body).json().then(errorResponse => reject(new Error(JSON.stringify(errorResponse)))));
          this.downloadAttachment(response, 'scarti.csv')
      }),
    };
  }


  public getFullUrlForAjax(path: string) {
    return this.getFullUrl(path);
  }

  /************************************************
   * PRIVATE FUNCTIONS
   ************************************************/
  private getFullUrl(path: string) {
    if (!path) return this.baseUrl;
    if (path.indexOf('/') == 0) return this.baseUrl + path;
    return this.baseUrl + '/' + path;
  }

  private successParser(response) {
    if (response.status == 204) {
      /* No Content */
      return response;
    } else {
      return response.json();
    }
  }

  private errorParser(text, statusCode) {
    throw new Error(JSON.stringify({...JSON.parse(text), code: statusCode}));
  }

  private downloadAttachment(response, fileName){
    response.blob().then(_blob => {
      let elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(_blob);
      elem.download = fileName
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    });
  }

  /**************************************************
   * VARIABLES
   **************************************************/
  private readonly baseUrl: string;
}
