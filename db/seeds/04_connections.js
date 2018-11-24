
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('connections').del()
    .then(function () {
      // Inserts seed entries
      return knex('connections').insert([
        {id: 1, first_user_id: 1, second_user_id: 2, connected_at: '2018-11-17 10:24:59', friends: false, is_connected: true},
        {id: 2, first_user_id: 3, second_user_id: 4, connected_at: '2018-11-17 10:24:59', friends: false, is_connected: true},
        {id: 3, first_user_id: 4, second_user_id: 1, connected_at: '2018-11-17 10:24:59', friends: false, is_connected: true},
      ]);
    });
};
