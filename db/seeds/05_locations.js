
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {id: 11111, user_id: 1, lat: 37.7858340000, long: -122.4064170000, last_check_in: '2018-11-17 10:23:58'},
        {id: 11112, user_id: 2, lat: 37.7858340000,  long: -122.4064170000, last_check_in: '2018-11-17 10:23:50'},
        {id: 11113, user_id: 3, lat: 37.7858340000, long: -122.4064170000, last_check_in: '2018-11-17 10:23:45'},
        {id: 11114, user_id: 4, lat: 37.7858340000, long: -122.4064170000, last_check_in: '2018-11-17 10:23:45'},
        {id: 11115, user_id: 5, lat: 49.2824545000, long: -123.1180510000, last_check_in: '2018-11-17 10:23:45'},
        {id: 11116, user_id: 6, lat: 49.2807450000, long: -123.1149940000, last_check_in: '2018-11-17 10:23:45'},
        {id: 11117, user_id: 7, lat: 49.2815810000, long: -123.1130975000, last_check_in: '2018-11-17 10:23:45'},

      ]);
    });
};