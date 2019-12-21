/**
 * Service for send GET/POST HTTP requests
 */
export default class NetworkService {

    static async get(url = '', params = {}) {
        // todo check params
        const response = await fetch(url, params);
        return this._checkResponse(response);
    }

    static async post(url, params = {}) {
        const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(params), // тип данных в body должен соответвовать значению заголовка "Content-Type"
        };

        const response = await fetch(url, options);
        return this._checkResponse(response);
    }

    static _checkResponse(response) {
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return response.json();
    }
}