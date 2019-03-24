const db = require('../database');
const fields = ['id', 'start', 'end', 'user_id'];
const fieldsToSelect = [
    'events.id as id',
    'events.start as start',
    'events.end as end',
    'u.id as user_id',
    'g.id as game_id',
    'g.name as game_name',
    'u.name as user_name',
    'v.id as venue_id',
    'v.name as venue_name',
    'v.city as venue_city',
    'v.state as venue_state'
];

class Event {
    static async findAll(count = 10, page = 1) {
        try {
                let offset = count * ( page - 1);
                let rows = await db.select(fieldsToSelect).from(function () {
                    this.select().from('events').limit(count).offset(offset).orderBy('events.start').as('events');
                })
                    .leftJoin('games_events', 'games_events.event_id', 'events.id')
                    .leftJoin('games as g', 'games_events.game_id', 'g.id')
                    .leftJoin('users as u', 'u.id', 'events.user_id')
                    .leftJoin('venues as v', 'v.id', 'events.venue_id');

                let countQuery = await db('events').count();
                let totalCount = Number(countQuery[0].count);

                let uniqueEventIds = rows.map(row => row.id).filter((val, index, self) => {
                    return self.indexOf(val) === index;
                });
                let eventRows = uniqueEventIds.map(id => rows.find(row => row.id === id));

                let events = eventRows.map(event => {
                        let row = rows.find(row => row.venueId === event.venueId);
                        let venue = {
                            id: row.venueId,
                            name: row.venueName,
                            location: `${row.venueCity}, ${row.venueState}`
                        };

                        row = rows.find(row => row.userId === event.userId);
                        let player = {
                            id: row.userId,
                            name: row.userName
                        };

                    return { 
                        id: event.id,
                        games: rows.filter(row => row.id === event.id).map(row => {
                            return {
                                id: row.gameId,
                                name: row.gameName
                            }
                        }),
                        venue,
                        player
                    };
                });
            return {
                events,
                totalCount,
                page
            };
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    static async find(id) {
        try {
            let rows = await db.select(fieldsToSelect).from(function () {
                this.select().from('events').where({ id })
                .as('events');
            })
            .leftJoin('games_events', 'games_events.event_id', 'events.id')
            .leftJoin('games as g', 'games_events.game_id', 'g.id')
            .leftJoin('users as u', 'u.id', 'events.user_id')
            .leftJoin('venues as v', 'v.id', 'events.venue_id');
            let row = rows[0];
            return {
                id: row.id,
                games: rows.map(row => ({ id: row.gameId, name: row.gameName })),
                venue: {
                    id: row.venueId,
                    name: row.venueName
                },
                player: {
                    id: row.userId,
                    name: row.userName
                }
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = Event;