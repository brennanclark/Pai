const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);

function runMyConnectedUsers(userId){
  return function() {
    this.distinct('first_user_id AS user_id')
      .from('connections')
      .where('second_user_id', userId)
      .union(function(){
        this.distinct('second_user_id AS user_id')
        .from('connections')
        .where('first_user_id', userId)
      });
  }
}
const getMyConnectedUsers = (userId) => {
  return knex('users')
    .select('*')
    .whereIn('id', runMyConnectedUsers(userId));
}

const getConnectedUserNuggets = (userId) => {
  return knex('nuggets')
    .select('nuggets.*', 'questions.*')
    .innerJoin('questions', 'nuggets.question_id', 'questions.id')
    .whereIn('nuggets.user_id', runMyConnectedUsers(userId));
}

// getMyConnectedUsers(1)
//   .then(console.log.bind(console));

// getConnectedUserNuggets(1)
//   .then((result) => console.log(result));
function groupBy(arr, grouper){
  const output = {};
  for(const item of arr){
    const key = grouper(item);
    if(output[key]){
      output[key].push(item);
    } else {
      output[key] = [item];
    }
  }
  return output;
}
const usersAndNuggets = Promise.all([getMyConnectedUsers(1), getConnectedUserNuggets(1)]);
usersAndNuggets
  .then(([users, nuggets]) => {
    const nuggetsGroupedByUserId = groupBy(nuggets, (nugget) => nugget.user_id);
    return users.map(user => {
      return {
        ...user,
        nuggets: nuggetsGroupedByUserId[user.id] || []
      }
    })
  })
  .then((results) => {
    console.log(results);
  })

// getMyConnectedUserIds(1)
//   .then((result) => { console.log(result); });