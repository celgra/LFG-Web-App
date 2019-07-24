const express = require('express')
const router = express.Router();
const pick = require('lodash/pick');

const User = require('../../models/user');

router.get('/', async (req, res) => {
    try {
        let { count, page } = req.query;
        let users = await User.findAll(count, page);
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let user = await User.find(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        let body = pick(req.body, ['userName', 'userPassword']);
        let { user, token } = await User.authenticate(body);
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(401).send('invalid username/password');
    }
});

router.post('/', async (req, res) => {
    try {
        let body = pick(req.body, ['userName', 'userPassword', 'email']);
        let { user, token } = await User.create(body);
        res.header('x-auth', token).status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;