const db = require('../database');
const { find, findAll } = require('../database/helpers');

const fields = ['name', 'publisher', 'image'];

class Game {
    static async findAll(count, page = 1) {
        try {
            let result = await findAll(db, 'games', { count, page, fields });
            return result;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async find(id) {
        try {
            let result = await find(db, 'games', { id, fields });
            return games[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = Game;