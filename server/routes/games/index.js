const express = require('express')
const router = express.Router();

const Game = require('../../models/game');

router.get('/', async (req, res) => {
    try {
        let { count, page } = req.query;
        let games = await Game.findAll(count, page);
        res.send({ games: games, ...games });
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;