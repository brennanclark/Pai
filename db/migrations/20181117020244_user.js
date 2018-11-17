
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) =>  {
    table.increments('id').primary();
    table.string('first_name').notNull();
    table.string('qrcode').notNull();
    table.dateTime('create_date').notNull();
    table.string(['question', 'answer']).notNull();
    
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
