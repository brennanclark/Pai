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

module.exports = function(knex) {

  return {
    getConnectUsersWithNuggets(userId) {
      function runConnectedUsers(){
        this.distinct('first_user_id AS user_id')
          .from('connections')
          .where('second_user_id', userId)
          .union(function(){
            this.distinct('second_user_id AS user_id')
            .from('connections')
            .where('first_user_id', userId)
          });
      }
      const myConnectedUsers = knex('users')
        .select('*')
        .whereIn('id', runConnectedUsers);

      const myConnectedUsersNuggets =  knex('nuggets')
        .select('nuggets.*', 'questions.*')
        .innerJoin('questions', 'nuggets.question_id', 'questions.id')
        .whereIn('nuggets.user_id', runConnectedUsers);

      const usersAndNuggets = Promise.all([myConnectedUsers, myConnectedUsersNuggets]);
      return usersAndNuggets
        .then(([users, nuggets]) => {
          const nuggetsGroupedByUserId = groupBy(nuggets, (nugget) => nugget.user_id);
          return users.map(user => {
            return {
              ...user,
              nuggets: nuggetsGroupedByUserId[user.id] || []
            }
          });
        });
    },

    getMyProfileWithNuggets(userId) {
      const myProfile = knex('users')
        .first('*')
        .where('id', userId);

      const myNuggets = knex('nuggets')
        .select('nuggets.*', 'questions.*')
        .innerJoin('questions', 'nuggets.question_id', 'questions.id')
        .where('nuggets.user_id', userId);

      const profileAndNuggets = Promise.all([myProfile, myNuggets]);
      return profileAndNuggets
        .then(([user, nuggets]) => {
            return {
              ...user,
              nuggets: nuggets
            }
        });
    },

    deleteConnectionById(id) {
      return knex('connections')
      .where('id', id)
      .update({
        'is_connected': false
      })
      .then()
    },

    sendLocationToDatabase(userId, lat, long, lastCheckIn){
      return knex('locations')
      .insert([
        {user_id: userId},
        {lat: lat},
        {long: long},
        {last_check_in: lastCheckIn},
      ])
      // .whereNotExists(function() {
      //   this.from('locations')
      //   .select('user_id')
      //   .where('user_id',userId)
      // })
      // .update({
      //   'lat' : lat,
      //   'long' : long,
      //   'last_check_in': lastCheckIn
      // })
    }

  }
}