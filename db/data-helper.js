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
    getConnectUsersWithNuggets(userId, cb) {

      function runConnectedUsers(){
        this.select('first_user_id AS user_id')
          .from('connections')
          .where({
            'second_user_id': userId,
            'is_connected': true,
            'friends': false
          })
          .union(function(){
            this.select('second_user_id AS user_id')
            .from('connections')
            .where({
              'first_user_id': userId,
              'is_connected': true,
              'friends': false
            })
          });
      }

      function getTheirFriends(matchId) {
        return (knex.select('first_user_id AS user_id')
          .from('connections')
          .where({
            'second_user_id': matchId,
            'friends': true
          })
          .union(function(){
            this.select('second_user_id AS user_id')
            .from('connections')
            .where({
              'first_user_id': matchId,
              'friends': true
            })
          }).then(x => x))
      }

      function getMutualConnection(uid1, uid2){

        return knex.raw(
          `SELECT * FROM
          connections WHERE first_user_id IN (${uid1}, ${uid2})
          AND second_user_id IN  (${uid1}, ${uid2})`
        )
      }

      const myConnectedUsers = knex('users')
        .select('*')
        .whereIn('id', runConnectedUsers);

      const myConnectedUsersNuggets =  knex('nuggets')
        .select('nuggets.*', 'questions.*')
        .innerJoin('questions', 'nuggets.question_id', 'questions.id')
        .whereIn('nuggets.user_id', runConnectedUsers);

      const usersAndNuggets = Promise.all([myConnectedUsers, myConnectedUsersNuggets]); //, theirFriends
      return usersAndNuggets
        .then(([users, nuggets]) => {
          const nuggetsGroupedByUserId = groupBy(nuggets, (nugget) => nugget.user_id);


          let promises = users.map(user => {

            const mutualConnections  = getMutualConnection(user.id, userId)
            const friendCountPromise = getTheirFriends(user.id).then(list => list.length);
            // const connectedAtPromise = getConnectedAtTime(user.id);

            return Promise.all([friendCountPromise, mutualConnections])
              .then(([foafcount, connection]) => {
                return {
                  ...user,
                  connected_at: connection.rows[0].connected_at,
                  connection_id: connection.rows[0].id,
                  number_of_friends: foafcount,
                  nuggets: nuggetsGroupedByUserId[user.id] || []
                }
              })
          });
          Promise.all(promises).then(function(results) {
            cb(results);
          })
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

      const myFriends = knex('connections')
      .select('*')
      .where({
        'second_user_id': userId,
        'friends': true
      })
      .union(function(){
        this.select('*')
        .from('connections')
        .where({
          'first_user_id': userId,
          'friends': true
        })
      });

      const profileAndNuggetsAndFriends = Promise.all([myProfile, myNuggets, myFriends]);
      return profileAndNuggetsAndFriends
        .then(([user, nuggets, friends]) => {
            return {
              ...user,
              number_of_friends: friends.length,
              nuggets: nuggets
            }
        });
    },

    createNewConnection(sourceId, friendId) {
      return knex('connections')
      .insert({first_user_id: sourceId, second_user_id: friendId, connected_at: new Date(), friends: false, is_connected: true})
    },

    setFriendsAt(id) {
      return knex('connections')
      .where('id', id)
      .update({
        'friends': true
      })
      .then()
    },

    deleteConnectionById(id) {
      console.log("rohit connection test ",id);
      return knex('connections')
      .where('id', id)
      .update({
        'is_connected': false
      })
      .then()
    },

    sendLocationToDatabase(userId, lat, long){
      return knex.raw(
        `INSERT INTO locations(user_id, lat, long, last_check_in)
        VALUES (${userId}, ${lat}, ${long}, current_timestamp AT TIME ZONE 'PST')
        ON CONFLICT (user_id) DO UPDATE
        SET lat = ${lat}, long = ${long}, last_check_in = current_timestamp AT TIME ZONE 'PST'`
      )
    },

    findLocationByUserId(id){
      return knex('locations')
      .select('*')
      .where('user_id', id);
    },

    getUsersExcept(id){
      return knex('users')
      .select('id')
      .whereNot('id',id)
    }
  }
}
