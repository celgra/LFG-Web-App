const db = require('../database');
const { find, findAll } = require('../database/helpers');
const isArray = require('lodash/isArray');

const table = 'venues';
const fields = ['id', 'name', 'address', 'city', 'state', 'zipcode', db.raw('ST_asGeoJSON(geo) geo')];

class Venue {
    static async findAll(count, page = 1) {
        try {
            let result = await findAll(db, table, { count, page, fields });
            
            if (!isArray(result)) {
                result.venues = result.venues.map(venue => ({ ...venue, geo: JSON.parse(venue.geo) }));
            } else {
                result = {
                    venues: result.map(venue => ({ ...venue, geo: JSON.parse(venue.geo) }))
                };
            }

            return result;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async find(id) {
        try {
            let result = await find(db, table, { id, fields });
            return result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = Venue;