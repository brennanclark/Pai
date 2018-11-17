
exports.up = function(knex, Promise) {
  return knex.schema.createTable('connections', (table) =>  {
    table.increments('id').primary();
    table.integer('first_user_id').unsigned().notNull();
    table.integer('second_user_id').unsigned().notNull();
    table.dateTime('expires_at').notNull();
    table.dateTime('friends_at');

    table.foreign('first_user_id').references('id').inTable('users');
    table.foreign('second_user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('connections');
};  
