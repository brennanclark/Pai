exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('nuggets').del()
    .then(function () {
      // Inserts seed entries
      return knex('nuggets').insert([
        {id: 1, user_id: 1, question_id: 1, answer: 'Tokyo'},
        {id: 2, user_id: 1, question_id: 2, answer: 'Kayne circa Highschool Dropout'},
        {id: 3, user_id: 1, question_id: 3, answer: 'Mr.T'},
        {id: 4, user_id: 1, question_id: 4, answer: 'My Age'},

        {id: 5, user_id: 2, question_id: 5, answer: 'Other Side of the Country'},
        {id: 6, user_id: 2, question_id: 9, answer: 'Incredible Good Looks, Undeniable Smile, Strong Compassion, Ability to find anyone in the world'},
        {id: 7, user_id: 2, question_id: 7, answer: 'Timbits, Good friends, being away from the rain'},
        {id: 8, user_id: 2, question_id: 4, answer: 'Incredible Good Looks, Undeniable Smile, Strong Compassion, Ability to find anyone in the world'},

        {id: 9, user_id: 3, question_id: 9, answer: 'My super human strength'},
        {id: 10, user_id: 3, question_id: 1, answer: 'The bahamas'},
        {id: 11, user_id: 3, question_id: 2, answer: 'Nima Boscarino'},
        {id: 12, user_id: 3, question_id: 3, answer: 'Billionaire'},

        {id: 13, user_id: 4, question_id: 4, answer: 'Where I hid the drugs'},
        {id: 14, user_id: 4, question_id: 9, answer: 'My awesome looks!'},
        {id: 15, user_id: 4, question_id: 6, answer: 'Walking in Style'},
        {id: 16, user_id: 4, question_id: 1, answer: 'New York'},
      ]);
    });
};