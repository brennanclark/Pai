exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNull();
    table.integer('lat');
    table.integer('long');
    table.dateTime('last_check_in')

    table.foreign('user_id').references('id').inTable('users');
  })
 
 };
 
 exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations');
 };