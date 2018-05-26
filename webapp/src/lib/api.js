"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const decentraland_commons_1 = require("decentraland-commons");
const httpClient = axios_1.default.create();
const URL = decentraland_commons_1.env.get('REACT_APP_API_URL', '');
class API {
    fetchDomains(param) {
        return this.request('get', '/domains', { param });
    }
    fetchTranslations(locale) {
        return this.request('get', '/translations', { locale });
    }
    request(method, path, params) {
        let options = {
            method,
            url: this.getUrl(path)
        };
        if (params) {
            if (method === 'get') {
                options.params = params;
            }
            else {
                options.data = params;
            }
        }
        return httpClient
            .request(options)
            .then((response) => {
            const data = response.data;
            const result = data.data; // One for axios data, another for the servers data
            return data && !data.ok
                ? Promise.reject({ message: data.error, data: result })
                : result;
        })
            .catch((error) => {
            console.warn(`[API] HTTP request failed: ${error.message || ''}`, error);
            return Promise.reject(error);
        });
    }
    getUrl(path) {
        return `${URL}/api${path}`;
    }
}
exports.API = API;
exports.api = new API();
//# sourceMappingURL=api.js.map