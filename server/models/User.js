const db = require('../database');

const fields = ['id', 'name'];

class User {
    static findAll() {
        return db.select(...fields).from('users');
    }

    static create(user) {
        return db('users').insert({ ...user, passwordHash}, ...fields);
    }

    static authenticate({ name, password }) {
        let passwordHash;
        return db('users').where({ name, passwordHash }).select(...fields);
    }
}

module.exports = User;