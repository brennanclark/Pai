
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {id: 1, question: 'If you could travel anywhere in the world, where would you go?'},
        {id: 2, question: 'You’ve been given the opportunity to give all of your money to charity. Who do you give it to?'},
        {id: 3, question: 'When you were a child, what did you want to be when you grew up?'},
        {id: 4, question: 'What is the one thing that you consider OK to lie about?'},
        {id: 5, question: 'Do you know where your birth certificate is at this very minute?'},
        {id: 6, question: 'How do you get to work everyday?'},
        {id: 7, question: 'What three things make you happiest right now?'},
        {id: 8, question: 'You can either speak or hear, but not both. Which do you chose?'},
        {id: 9, question: 'What is your greatest strength?'},
      ]);
    });
};
