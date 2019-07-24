const db = require('../database');
const crypto = require('crypto');
const uuid = require('../helpers/uuid');
const jwt = require('jsonwebtoken');
const isEmpty = require('lodash/isEmpty');

const fields = ['id', 'name','bio', 'createdAt'];
const SECRET = 'sfdsfsfsfs';

const getRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

const sha512 = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let passwordHash = hash.digest('hex');
    return {
        salt,
        passwordHash
    };
};

const saltHashPassword = (userPassword) => {
    let salt = getRandomString(16);
    let passwordData = sha512(userPassword, salt);
    return passwordData;
};

const generateToken = ({ id }, permissions) => {
    let access =  permissions.reduce((acc, val) => { 
        return acc ? `${acc}:${val}` : val;
     }, '');
    let token = jwt.sign( { id, access }, SECRET).toString();
    return token;
}

class User {
    static async find(id) {
        try {
            let users = await db.select(...fields).from('users');
            if (users[0]) {
                return Promise.resolve(users[0]);
            } else {
                return Promise.reject('User not found');
            }
        } catch (error) {
            return Promise.reject(error);
        }        
    }

    static findAll() {
        return db.select(...fields).from('users');
    }

    static async findByToken(token) {
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET);
            let users = await db('users').where({ id: decoded.id}).select(...fields);

            if(users[0]) {
                return Promise.resolve(users[0]);
            } else {
                return Promise.reject('User not found');
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async create({ userName, email, userPassword }) {
        try {
            if (isEmpty(userName) || isEmpty(email) || isEmpty(userPassword)) {
                throw Error('User registration form was not complete');
            }
            let { passwordHash, salt } = saltHashPassword(userPassword);
            let users = await db('users')
                .returning(fields)
                .insert({ 
                    id: uuid(),
                    name: userName, 
                    email: email, 
                    passwordHash, 
                    salt
                });
            let token = generateToken(users[0].id, ['access']);
            return Promise.resolve({ user: users[0], token });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async authenticate({ userName, userPassword }) {
        try {
            if (isEmpty(userName) || isEmpty(userPassword)) {
                throw Error('User sign-in form was not complete');
            }
            let users = await db('users')
                .where({ name: userName })
                .select();
            if (!users[0]) {
                return Promise.reject('Username and password were not a match');
            }

            return new Promise((resolve, reject) => {
                let user = users[0];
                if (user.passwordHash === sha512(userPassword, user.salt).passwordHash) {
                    let token = generateToken(user, ['access']);
                    resolve({ 
                        user: { 
                            id: user.id,
                            name: user.name
                        }, 
                        token
                    });
                } else {
                    reject('Incorrect password');
                }
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = User;