const express = require('express')
const router = express.Router();

const Game = require('../../models/game');

router.get('/', async (req, res) => {
    try {
        let { count, page } = req.query;
        let games = await Game.findAll(count, page);
        res.send({ games });
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    try {
        let game = await Game.find(res.params.id);
        res.send(game);
    } catch (error) {
    res.status(500).send(error)
    }
});

module.exports = router;