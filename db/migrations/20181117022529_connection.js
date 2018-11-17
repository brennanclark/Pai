
exports.up = function(knex, Promise) {
  return knex.schema.createTable('connections', (table) =>  {
    table.increments('id').primary();
    table.integer('first_user_id').unsigned().notNull();
    table.integer('second').unsigned().notNull();
    table.dateTime('expire_at')
    table.dateTime('friends_at')
    table.string(['question', 'answer']).notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('connections');
};
