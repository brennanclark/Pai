

module.exports = function(knex) {

  return {

    getUsersConnectionsById(id, cb) {
      return knex('connections')
      .select('*')
      .where('first_user_id', id)
      .union(function() {
        this.select('*').from('connections').where('second_user_id', id);
      })
      .then()
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