
exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('name');
        table.string('email').unique();
        table.string('salt');
        table.string('password_hash');
        table.text('bio');
        table.timestamps();
    });

    await knex.schema.createTable('events', (table) => {
        table.uuid('id').primary();
        table.datetime('start');
        table.datetime('end');
        table.uuid('user_id');
        table.foreign('user_id').references('users.id');
        table.timestamps();
    });

    await knex.schema.createTable('games', (table) => {
        table.uuid('id').primary();
        table.string('name');
        table.string('publisher');
        table.binary('image');
        table.timestamps();
    });

    await knex.schema.createTable('venues', (table) => {
        table.uuid('id').primary();
        table.string('name');
        table.string('publisher');
        table.specificType('geo', 'POINT');
        table.timestamps();
    });

    await knex.schema.createTable('games_events', (table) => {
        table.uuid('event_id');
        table.uuid('game_id');
        table.foreign('event_id').references('events.id');
        table.foreign('game_id').references('games.id');
        table.primary(['event_id', 'game_id']);
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('games_events');
    await knex.schema.dropTable('venues');
    await knex.schema.dropTable('games');
    await knex.schema.dropTable('events');
    await knex.schema.dropTable('users');
}
  