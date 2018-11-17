
exports.up = function(knex, Promise) {
  return knex.schema.table('nuggets', (table) => {
    table.dropColumn('question');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('nuggets', (table) => {
    table.string('question');
  });
};
