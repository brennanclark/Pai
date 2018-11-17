
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('nuggets', function (table) {
      table.integer('question_id').unsigned().notNull();

      table.foreign('question_id').references('id').inTable('questions');
    })
  ])
};

exports.down = function(knex, Promise) {
  table.dropColumn('question_id');
};
