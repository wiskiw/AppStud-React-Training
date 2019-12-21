/**
 * Service for send GET/POST HTTP requests
 */
export default class NetworkService {

    static async get(url = '', params = {}) {
        return this._fetch(url, params);
    }

    static async post(url, params = {}) {
        return this._fetch(url, params, 'POST');
    }

    static async _fetch(url, params, method = 'GET') {
        const options = {
            method,
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json' // we will be sending JSON
            },
        };

        // if params exists and method is GET, add query string to url
        // otherwise, just add params as a "body" property to the options object
        if (params) {
            if (method === 'GET') {
                url += '?' + this._objectToQueryString(params);
            } else {
                options.body = JSON.stringify(params); // body should match Content-Type in headers option
            }
        }

        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response;
            })
            .then(response => response.json());
    }

    static _objectToQueryString(obj) {
        return Object.keys(obj)
            .map(key => key + '=' + obj[key])
            .join('&');
    }
}