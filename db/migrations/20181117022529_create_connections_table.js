
exports.up = function(knex, Promise) {
  return knex.schema.createTable('connections', (table) =>  {
    table.increments('id').primary();
    table.integer('first_user_id').unsigned().notNull();
    table.unique('first_user_id');
    table.integer('second_user_id').unsigned().notNull();
    table.dateTime('connected_at').notNull();
    table.boolean('friends').notNull();
    table.boolean('is_connected').notNull();

    table.foreign('first_user_id').references('id').inTable('users');
    table.foreign('second_user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('connections');
};
