
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {

      // Inserts seed entries
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          topic: 'Coding'
        }),
        knex('users').insert({
          id: 2,
          topic: 'Cooking'
        }),
        knex('users').insert({
          id: 3,
          topic: 'Languages'
        }),
        knex('users').insert({
          id: 4,
          topic: 'Photography'
        }),
        knex('users').insert({
          id: 5,
          topic: 'Gaming'
        })
      ]);
    });
};
