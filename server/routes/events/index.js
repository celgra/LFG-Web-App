const express = require('express')
const router = express.Router();

const Event = require('../../models/event');

router.get('/', async (req, res) => {
    try {
        let events = await Event.findAll();
        res.send(events);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let event = await Event.find(req.params.id);
        res.send(event);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;