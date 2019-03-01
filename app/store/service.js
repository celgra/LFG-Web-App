import Service from '@ember/service';

import axios from 'axios';

export default class StoreService extends Service {
    urlRoot = '/api/';

    find(model, id) {
        return axios.get(`${this.urlRoot}${model}/${id}`);
    }

    query(model, query = {}) {
        let keys = Object.keys(query);
        let initialValue = keys.length > 0 ? '?' : '';

        let queryString = keys.reduce((acc, val) => {
            let prefix = acc.length > 1 ? '&' : '';
            return acc + `${prefix}${val}=${query[val]}`
        }, initialValue);
        
        let queryParams = encodeURI(queryString)
        return axios.get(`${this.urlRoot}${model}${queryParams}`);
    }

    create(model, data) {
        return axios.post(`${this.urlRoot}${model}`, data);
    }

    update(model, id, data) {
        return axios.put(`${this.urlRoot}${model}/${id}`, data);
    }

    delete(model, id) {
        return axios.delete(`${this.urlRoot}${model}/${id}`);
    }
 }
