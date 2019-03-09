const express = require('express')
const router = express.Router();

const User = require('../../models/user');

router.get('/', async (req, res) => {
    try {
        let users = await User.findAll();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        let { user, token } = await User.authenticate(req.body);
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(401).send('invalid username/password');
    }
});

router.post('/', async (req, res) => {
    try {
        let { user, token } = await User.create(req.body);
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;