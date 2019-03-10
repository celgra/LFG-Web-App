const express = require('express')
const router = express.Router();

const users = require('./users');
const games = require('./games');
const events = require('./events');
const venues = require('./venues');

router.use('/users', users);
router.use('/games', games);
router.use('/events', events);
router.use('/venues', venues);

module.exports = router;