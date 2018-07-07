import axios from 'axios';

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
        return response;
      })
      .catch(err => {
        throw err;
      });
  }

  // axios methods send cookies on each request to leverage express session
  static getWithAxios = url => {
    return axios({
      method: 'get',
      url: url,
    })
      .then(function(response) {
        return response;
      })
      .catch(function(err) {
        throw err;
      });
  };

  static postWithAxios = (formData, url) => {
    return axios({
      method: 'post',
      url: url,
      data: formData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    })
      .then(function(response) {
        return response;
      })
      .catch(function(err) {
        throw err;
      });
  };
}
