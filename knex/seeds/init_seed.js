const uuid = require('uuid/v1');
const moment = require('moment');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('games_events').del();
  await knex('events').del();
  await knex('venues').del();
  await knex('games').del();
  await knex('users').del();


  await knex('users').insert([
    { 
      id: '4eb133c0-45f9-11e9-9f40-052862868387', 
      name: 'ElGiGante13', 
      email: 'wootwoot1@juggalo.com', 
      salt: '7af9c3f090506f9c', 
      password_hash: '16056e8eb404c4bbcf1ac9a75b1b3d6081e65d1b64bc021acb0894e7d99bb97689735167018205f9d6894d04042458619699e670df2171ff7715ea010c533693' 
    },
    { 
      id: '3202b5d0-4605-11e9-885b-1f557fa85898', 
      name: 'ElGiGante12', 
      email: 'wootwoot2@juggalo.com', 
      salt: '3c331ba4259d432b', 
      password_hash: '80a1fd2b28bc713112f987b7fe0680bf7c5d199cccada76be7a193b470225f7e8fe1b55c41aa5a8b6918e77bdec6e5c562aa6d2d24c544881980b87e806e7cf5' 
    },
  ]);

  await knex('games').insert([
    { id: '3db66090-4383-11e9-a1d3-dd343068f0aa', name: 'Magic: The Gathering', publisher: 'Wizards of the Coast' },
    { id: '50b5da30-4384-11e9-95f6-ad91bb8782d3', name: 'Dungeons and Dragons', publisher: 'Wizards of the Coast' },
    { id: '69fe5350-4384-11e9-a3a6-87feda65c9db', name: 'Star Wars Destiny', publisher: 'Fantasy Flight Games' },
    { id: '10c50710-4385-11e9-a3a6-87feda65c9db', name: 'Android Netrunner', publisher: 'Fantasy Flight Games' },
    { id: '12061290-4385-11e9-a3a6-87feda65c9db', name: 'Legend of the Five Rings', publisher: 'Fantasy Flight Games' }
  ]);

  await knex('venues').insert([
    { 
      id: '17cd0110-4606-11e9-b466-972b102d5279', 
      name: "Dragon's Lair", 
      address: '2438 W Anderson Ln B1',
      city: 'Austin', 
      state: 'TX', 
      country: 'United States',
      zipcode: '78757',
      geo: knex.raw("ST_GeomFromText('POINT(-97.7328 30.3580)', 4326)")
    },
    { 
      id: '6d5e6910-4607-11e9-8a91-2daa11ff759a', 
      name: "Emerald Tavern", 
      address: '9012 Research Blvd #6',
      city: 'Austin', 
      state: 'TX', 
      country: 'United States',
      zipcode: '78758',
      geo: knex.raw("ST_GeomFromText('POINT(-97.7247 30.3712)', 4326)")
    }
  ]);

  let eventIds = [uuid(), uuid()];
  let startTime = [
    moment().hour(moment().hour() + 2).utc().format(),
    moment().hour(moment().hour() + 4).utc().format(),
  ];

  await knex('events').insert([
    {
      id: eventIds[0],
      start: moment().utc().format(),
      end: startTime[0],
      user_id: '4eb133c0-45f9-11e9-9f40-052862868387',
      venue_id: '17cd0110-4606-11e9-b466-972b102d5279'
    }, {
      id: eventIds[1],
      start: moment().utc().format(),
      end: startTime[1],
      user_id: '3202b5d0-4605-11e9-885b-1f557fa85898',
      venue_id: '6d5e6910-4607-11e9-8a91-2daa11ff759a'
    }
  ]);

  await knex('games_events').insert([
    {
      event_id:eventIds[0],
      game_id: '3db66090-4383-11e9-a1d3-dd343068f0aa'
    },
    {
      event_id:eventIds[0],
      game_id: '50b5da30-4384-11e9-95f6-ad91bb8782d3'
    },
    {
      event_id:eventIds[0],
      game_id: '69fe5350-4384-11e9-a3a6-87feda65c9db'
    },
    {
      event_id:eventIds[1],
      game_id: '3db66090-4383-11e9-a1d3-dd343068f0aa'
    },
    {
      event_id:eventIds[1],
      game_id: '50b5da30-4384-11e9-95f6-ad91bb8782d3'
    },
    {
      event_id:eventIds[1],
      game_id: '69fe5350-4384-11e9-a3a6-87feda65c9db'
    },
    {
      event_id:eventIds[1],
      game_id: '10c50710-4385-11e9-a3a6-87feda65c9db'
    },
    {
      event_id:eventIds[1],
      game_id: '12061290-4385-11e9-a3a6-87feda65c9db'
    }
  ]);
};
