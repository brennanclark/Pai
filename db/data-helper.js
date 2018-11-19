

module.exports = function(knex) {

  return {
    //getUsersConnectionsById(id).then(users => console.log(users));

    getUsersConnectionsById(id) {
      // return knex('connections')
      // .select('*')
      // .where('first_user_id', id)
      // .orWhere('second_user_id', id)
      // .then(function(connections) {
      //   return Promise.all(connections.map(connection => {
      //     if(connection.is_connected) {
      //       return knex('users')
      //       .select('*')
      //       .where('id', id === connection.first_user_id ? connection.second_user_id : connection.first_user_id)
      //       .then(function (user) {
      //         console.log(user)
      //         return user[0]
      //       })
      //     } else {
      //       return null
      //     }
      //   }).filter(value => value))
      // })
      
      return knex
      .select('users.id', 'users.first_name', 'users.profile_picture')
      .from('connections')
      .innerJoin('users', function() {
        this.on('users.id', '=', 'connections.first_user_id').orOn('users.id', '=', 'connections.second_user_id')
      })
      .where(function() {
        this.where('connections.first_user_id', id).orWhere('connections.second_user_id', id)
      })
      .andWhere('users.id', '!=', id);
    },

    deleteConnectionById(id) {
      return knex('connections')  
      .where('id', id)
      .update({
        'is_connected': false
      })
      .then()
    },

    getUsersProfileById(id, cb) {
      return knex('users')
      .where("id", id)
      .then()
    }
  }
}