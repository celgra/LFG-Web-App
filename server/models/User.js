const db = require('../database');

const fields = ['id', 'name'];

class User {
    static findAll() {
        return db.select(...fields).from('users');
    }

    static create({ name }) {
        return db('users').insert({ name, createdAt: new Date() });
    }
}

module.exports = User;