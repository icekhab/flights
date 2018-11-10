export default class HttpClient {
    constructor(url) {
        this.apiUrl = url
    }

    async post(path, body) {
        const headers = new Headers();

        headers.set('Content-Type', 'application/json');

        return this.fetch(path, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
    }

    async get(path) {
        return this.fetch(path, {
            method: 'GET'
        })
    }

    async delete(path) {
        return this.fetch(path, {
            method: 'DELETE',
        })
    }

    async fetch(path, options = {}) {
        const headers = options.headers || new Headers();

        headers.set('Authorization', 'b2569169-9b4c-492d-b138-faba38960d32')

        const response = await fetch(`${this.apiUrl}/${path}`, {
            ...options,
            headers,
        });

        let res = null;
        const text = await response.text();

        try {
            res = JSON.parse(text);
        } catch(e) {
            res = text;
        }

        if (!response.ok) {
            return Promise.reject(res);
        }

        return res;
    }
}