import querystring from "querystring-es3";
import is from "is_js";
import Auth from "@/services/Auth";

const token = Auth.getAccessToken();

class Api {
  /** *******************
   * Get Settings
   * ****************** */
  static makeGetUrl = (base, where) =>
      base + (is.empty(where) ? "" : `?${querystring.stringify(where)}`);
  static getHeader = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer  ${token ? token : null}`
  });

  // get filter
  /* filter implements */
  static searchEnd = response => response;

  static checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };

  static toJson = response => response.json();

  static toText = response => response.text();

  static fetchGet = (base, where = {}) =>
      window
          .fetch(this.makeGetUrl(base, where), {
            method: "GET",
            headers: this.getHeader()
          })
          .then(this.searchEnd)
          .then(this.checkStatus);

  /** *******************
   * Post/Put Settings
   * ****************** */
  static submitButton = () => document.querySelectorAll(".button");

  static updateHeader = () => ({
    "Content-Type": "application/json",
  });

  static updateFileHeader = () => ({
    "X-Requested-With": "csrf", // csrf header
  });

  /* filter implements */
  static updateStartFilter = () => {};

  /* filter implements */
  static updateEndFilter = () => {};

  static updatehEnd = response => {
    this.updateEndFilter();
    return response;
  };

  static postBase = (url, data) => {
    this.updateStartFilter();
    return window.fetch(url, {
      method: "POST",
      headers: this.getHeader(),
      body: JSON.stringify(data)
    });
  };

  static postFile = (url, data) => {
    this.updateStartFilter();
    return window.fetch(url, {
      method: "POST",
      headers: this.updateFileHeader(),
      body: data
    });
  };

  static putBase = (url, data) => {
    this.updateStartFilter();
    return window.fetch(url, {
      method: "PUT",
      headers: this.getHeader(),
      body: JSON.stringify(data)
    });
  };

  static fetchPost = (url, data) =>
      this.postBase(url, data)
          .then(this.updatehEnd)
          .then(this.checkStatus);

  static fetchPostFile = (url, data) =>
      this.postFile(url, data)
          .then(this.updatehEnd)
          .then(this.checkStatus);

  static fetchPut = (url, data) =>
      this.putBase(url, data)
          .then(this.updatehEnd)
          .then(this.checkStatus);

  /** *******************
   * Delete Settings
   * ****************** */
  static fetchDelete = url =>
      window
          .fetch(url, {
            method: "DELETE",
            headers: this.updateHeader()
          })
          .then(this.checkStatus);
}
const API_CONFIG = {};
API_CONFIG.HOST = window.location.origin;
API_CONFIG.BASE_URL = `http://academy.hobasoft.com/api/v1/`;
API_CONFIG.AUTH_URL = `${API_CONFIG.BASE_URL}auth`;
API_CONFIG.ADMIN_URL = `${API_CONFIG.BASE_URL}customer`;

export const customerApi = {
  getList: where => Api.fetchGet(`${API_CONFIG.ADMIN_URL}/list`, where).then(Api.toJson),
  findById : id => Api.fetchGet(`${API_CONFIG.ADMIN_URL}/getById/${id}`).then(Api.toJson),
  save: data => Api.fetchPost(`${API_CONFIG.ADMIN_URL}/save`, data).then(Api.toJson),
  update: (id, data) => Api.fetchPost(`${API_CONFIG.ADMIN_URL}/update/${id}`, data).then(Api.toJson),
  delete: id => Api.fetchGet(`${API_CONFIG.ADMIN_URL}/delete/${id}`).then(Api.toJson),
};
export const authApi = {
  signIn: (data) => Api.fetchPost(`${API_CONFIG.AUTH_URL}/login`, data).then(Api.toJson)
}