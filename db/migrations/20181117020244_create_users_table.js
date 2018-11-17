
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) =>  {
    table.increments('id').primary();
    table.string('first_name').notNull();
    table.string('qr_code').notNull();
    table.dateTime('created_at').notNull()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
