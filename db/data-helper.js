

module.exports = function(knex) {

  return {

    getUsersConnectionsById(id, cb) {
      return knex.select('*')
      .where("first_user_id")
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
      const query = knex.select('*')
      .from('users')
      .where()
    }
  }
}