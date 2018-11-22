exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNull();
    table.unique('user_id');
    table.index('user_id');
    table.decimal('lat', 14 , 10);
    table.decimal('long',14 , 10);
    table.dateTime('last_check_in');

    table.foreign('user_id').references('id').inTable('users');
  })
 };
 exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations');
 };
