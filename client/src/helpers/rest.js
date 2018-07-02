const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export default class Rest {
  static headers(auth, isMultiPart) {
    let optionalHeaders = {
      'Content-Type': 'application/json',
    };
    if (isMultiPart) {
      delete optionalHeaders['Content-Type'];
    }
    const staticHeaders = {
      Accept: 'application/json',
      Authorization: auth,
    };
    return Object.assign({}, staticHeaders, optionalHeaders);
  }

  static get(route, auth, isJSON) {
    return this.xhr(route, auth, null, METHOD.GET, isJSON);
  }

  static put(
    route: string,
    auth: string,
    params: any,
    isJSON?: boolean = true,
  ) {
    return this.xhr(route, auth, params, METHOD.PUT, isJSON);
  }

  static patch(
    route: string,
    auth: string,
    params: any,
    isJSON?: boolean = true,
  ) {
    return this.xhr(route, auth, params, METHOD.PATCH, isJSON);
  }

  static post(
    route: string,
    auth: string,
    params: any,
    isJSON?: boolean = true,
  ) {
    return this.xhr(route, auth, params, METHOD.POST, isJSON);
  }

  static delete(
    route: string,
    auth: string,
    params: any,
    isJSON?: boolean = true,
  ) {
    return this.xhr(route, auth, params, METHOD.DELETE, isJSON);
  }

  static getTransformedParams = (params: any, isMultiPart: boolean): any => {
    if (params) {
      if (isMultiPart) {
        return params;
      }
      return JSON.stringify(params);
    }
  };

  static xhr(
    route: string,
    auth: string,
    params: any,
    verb: string,
    isJSON: boolean,
  ) {
    let isMultiPart = false;
    if (params && params instanceof FormData) {
      isMultiPart = true;
    }

    const options = {
      method: verb,
      body: Rest.getTransformedParams(params, isMultiPart),
      headers: Rest.headers(auth, isMultiPart),
    };

    return fetch(route, options)
      .then(async response => {
        if (response.ok && response.status !== 204) {
          if (isJSON) {
            return response.json();
          }
          return response.text();
        } else if (response.ok && response.status === 204) {
          // do nothing because there's no body
        } else {
          throw { ...response, description: await response.text() }; // eslint-disable-line
        }
      })
      .catch(err => {
        throw err;
      });
  }

  // Verify that this works without JQuery when we implement a feature that uses it
  static postMultiPartFormData = (
    url: string,
    auth: string,
    bytes: Array<number>,
    extension: string,
  ) => {
    // bytes must be an array so that we can convert to a signed 8 byte array below
    if (!Array.isArray(bytes)) {
      throw new Error(
        'Called postMultiPartFormData with non-byte array, saw "' +
          typeof bytes +
          '" instead',
      );
    }

    let signedBytes = new Int8Array(bytes);
    let formData = new FormData();
    let blob = new Blob([signedBytes], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    formData.append('data', blob, 'jsaddin.' + extension);

    return Rest.post(url, auth, formData);
  };
}
