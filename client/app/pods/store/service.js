import Service from '@ember/service';
import { pluralize } from 'ember-inflector';

import axios from 'axios';

export default class StoreService extends Service {
    urlRoot = '/api/';

    async find(model, id) {
        try {
            let resourcePath = pluralize(model);
            let response = await axios.get(`${this.urlRoot}${resourcePath}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async query(model, query = {}) {
        try {
            let resourcePath = pluralize(model);
            let keys = Object.keys(query);
            let initialValue = keys.length > 0 ? '?' : '';

            let queryString = keys.reduce((acc, val) => {
                let prefix = acc.length > 1 ? '&' : '';
                return acc + `${prefix}${val}=${query[val]}`
            }, initialValue);
            
            let queryParams = encodeURI(queryString)
            let response = await axios.get(`${this.urlRoot}${resourcePath}${queryParams}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async create(model, data) {
        try {
            let resourcePath = pluralize(model);
            let response = await axios.post(`${this.urlRoot}${resourcePath}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async update(model, id, data) {
        try {
            let resourcePath = pluralize(model);
            let response = await axios.patch(`${this.urlRoot}${resourcePath}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

   async delete(model, id) {
       try {
        let resourcePath = pluralize(model);
        let response = await axios.delete(`${this.urlRoot}${resourcePath}/${id}`);
        return response.data;
       } catch (error) {
           throw error;
       }
    }
 }
