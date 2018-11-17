
exports.up = function(knex, Promise) {
  return knex.schema.table('connections', (table) => {
    table.renameColumn('expires_at', 'connected_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('connections', (table) => {
    table.renameColumn('connected_at', 'expires_at');
  });
};
