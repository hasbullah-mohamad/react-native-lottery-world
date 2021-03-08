import moment from 'moment';

import CONFIG from '../config';
import RestApi from './rest';
import StorageApi from './storage';

const { API_ENDPOINT, FIELDS, SETTINGS } = CONFIG;

const Api = {
  getDecryptKey() {
    let date = new Date();
    date -= SETTINGS.DIFFERENCE_IN_MILISECONDS;
    date = new Date(date);
    let hours = date.getHours();
    let nextHours = hours + 1;

    hours %= 12;
    nextHours %= 12;
    hours = hours || 12;
    nextHours = nextHours || 12;
    return { key: `${hours}1`, keySecondary: `${nextHours}1` };
  },

  decrypt(key, encryption) {
    let plaintext = '';
    for (let i = 0, ni = encryption.length; i < ni; i++) {
      const a = encryption.charCodeAt(i);
      const b = (a ^ key);
      plaintext += String.fromCharCode(b);
    }
    return plaintext;
  },

  addEncryptParams(params = {}) {
    const localParams = params;
    if (SETTINGS.ENCRYPT) {
      localParams.encrypt = true;
    }
    return params;
  },

  parseData(data) {
    if (SETTINGS.ENCRYPT) {
      const { key, keySecondary } = Api.getDecryptKey();
      try {
        const ret = JSON.parse(Api.decrypt(key, data));
        return ret;
      } catch (error) {
        console.log(error);
        try {
          const ret = JSON.parse(Api.decrypt(keySecondary, data));
          return ret;
        } catch (error) { console.log(error); }
      }
      return null;
    }
    return data;
  },

  async getConfig() {
    const url = `${API_ENDPOINT}/config`;
    try {
      const res = await RestApi.get(url);
      if (res.status === 200) {
        const data = await res.text();
        const ret = JSON.parse(data);
        const currentDatetime = new Date();
        const datetime = moment(ret.datetime);
        const differenceInMiliseconds = Math.floor((currentDatetime - datetime) / 1000) * 1000;

        SETTINGS.DATETIME = ret.datetime;
        SETTINGS.DATETIME_LOCAL = moment(currentDatetime).format('YYYY-MM-DD HH:mm:ss');
        SETTINGS.DIFFERENCE_IN_MILISECONDS = differenceInMiliseconds;
        return ret;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  async saveDomain(domain) {
    try {
      if (domain) {
        const domainString = JSON.stringify(domain);
        await StorageApi.save(FIELDS.DOMAIN, domainString);
      } else {
        await StorageApi.remove(FIELDS.DOMAIN);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async loadDomain() {
    try {
      const domainString = await StorageApi.load(FIELDS.DOMAIN);
      if (domainString) {
        const domain = JSON.parse(domainString);
        return domain;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  async getCompanies(domain) {
    const url = `${domain.endpoint}/companies`;
    const params = Api.addEncryptParams();
    try {
      const res = await RestApi.get(url, params);
      if (res.status === 200) {
        const data = await res.json();
        return Api.parseData(data);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  async getGame(domain, params) {
    const url = `${domain.endpoint}/sessions`;
    const localParams = Api.addEncryptParams(params);
    try {
      const res = await RestApi.get(url, localParams);
      if (res.status === 200) {
        const data = await res.json();
        return Api.parseData(data);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  async getCompanyGames(domain, params) {
    const url = `${domain.endpoint}/company-sessions`;
    const localParams = Api.addEncryptParams(params);
    try {
      const res = await RestApi.get(url, localParams);
      if (res.status === 200) {
        const data = await res.json();
        return Api.parseData(data);
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  },

  async getSearch(domain, query) {
    const url = `${domain.endpoint}/search?${query}`;
    try {
      const res = await RestApi.get(url);
      if (res.status === 200) {
        const data = await res.json();
        return Api.parseData(data);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  async getStatResult(domain, param) {
    const url = `${domain.endpoint}/${param}`;
    try {
      const res = await RestApi.get(url);
      if (res.status === 200) {
        const data = await res.json();
        return Api.parseData(data);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }
};

export default Api;
