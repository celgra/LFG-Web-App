const uuid = require('uuid/v1');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('games').del();
  await knex('venues').del();

  await knex('games').insert([
    { id: uuid(), name: 'Magic: The Gathering', publisher: 'Wizards of the Coast' },
    { id: uuid(), name: 'Dungeons and Dragons', publisher: 'Wizards of the Coast' },
    { id: uuid(), name: 'Star Wars Destiny', publisher: 'Fantasy Flight Games' },
    { id: uuid(), name: 'Android Netrunner', publisher: 'Fantasy Flight Games' },
    { id: uuid(), name: 'Legend of the Five Rings', publisher: 'Fantasy Flight Games' }
  ]);

  await knex('venues').insert([
    { 
      id: uuid(), 
      name: "Dragon's Lair", 
      address: '2438 W Anderson Ln B1',
      city: 'Austin', 
      state: 'TX', 
      country: 'United States',
      zipcode: '78757',
      geo: knex.raw('POINT(30.3580, 97.7328)')
    }
  ]);
};
