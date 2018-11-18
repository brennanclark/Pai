exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('nuggets').del()
    .then(function () {
      // Inserts seed entries
      return knex('nuggets').insert([
        {id: 1, user_id: 1, question_id: 1, answer: 'Tokyo'},
        {id: 2, user_id: 1, question_id: 2, answer: 'Make a wish'},
        {id: 3, user_id: 1, question_id: 3, answer: 'Batman'},
        {id: 4, user_id: 1, question_id: 4, answer: 'Eating too much chocolate'},
        {id: 5, user_id: 2, question_id: 5, answer: 'Under my matress'},
        {id: 6, user_id: 2, question_id: 6, answer: 'Hot air balloon'},
        {id: 7, user_id: 2, question_id: 7, answer: 'Being loved'},
        {id: 8, user_id: 2, question_id: 8, answer: 'Hear'},
        {id: 9, user_id: 3, question_id: 9, answer: 'My super human strength'},
        {id: 10, user_id: 3, question_id: 1, answer: 'The bahamas'},
        {id: 11, user_id: 3, question_id: 2, answer: 'The Ronald McDonald house'},
        {id: 12, user_id: 3, question_id: 3, answer: 'My mom'},
        {id: 13, user_id: 4, question_id: 4, answer: 'Where I hid the drugs'},
        {id: 14, user_id: 4, question_id: 5, answer: 'No!'},
        {id: 15, user_id: 4, question_id: 6, answer: 'Driving'},
        {id: 16, user_id: 4, question_id: 7, answer: 'My dogs'},
      ]);
    });
};