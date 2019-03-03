const express = require('express')
const router = express.Router();

const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        let users = await User.findAll();
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});

router.get('/create', async (req, res) => {
    try {
        let users = await User.create({ name: 'Stoopie' });
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;