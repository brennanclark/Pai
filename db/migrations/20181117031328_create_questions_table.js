exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', (table) =>  {
    table.increments('id').primary();
    table.string('question').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions');
};