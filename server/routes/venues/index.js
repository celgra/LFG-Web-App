const express = require('express')
const router = express.Router();

const Venue = require('../../models/venue');

router.get('/', async (req, res) => {
    try {
        let { count, page } = req.query;
        let venues = await Venue.findAll(count, page);
        res.send(venues);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let venue = await Venue.find(req.params.id);
        venue = {...venue, geo: JSON.parse(venue.geo)};
        res.send(venue);
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;