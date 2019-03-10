const db = require('../database');
const { find, findAll } = require('../database/helpers');

const fields = ['id', 'name', 'address', 'city', 'state', 'zipcode', 'geo'];

class Venue {
    static async findAll(count, page = 1) {
        try {
            let result = await findAll(db, 'venues', { count, page, fields });
            return result;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async find(id) {
        try {
            let result = await find(db, 'venues', { id, fields });
            return games[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = Venue;