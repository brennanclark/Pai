
exports.up = function(knex, Promise) {
  return knex.schema.createTable('nuggets', (table) =>  {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNull();
    table.integer('question_id').unsigned().notNull();
    table.string('answer').notNull();

    table.foreign('question_id').references('id').inTable('questions');
    table.foreign('user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('nuggets');
};
