
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'John', qr_code: 'someRandomString', profile_picture: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg', created_at: '2018-11-17 10:23:58'},
        {id: 2, first_name: 'Sebastian', qr_code: 'someRandomString', profile_picture: 'https://img2.thejournal.ie/inline/2470754/original/?width=428&version=2470754', created_at: '2018-11-17 10:23:50'},
        {id: 3, first_name: 'Alexandra', qr_code: 'someRandomString', profile_picture: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg', created_at: '2018-11-17 10:23:45'},
        {id: 4, first_name: 'Cassandra', qr_code: 'someRandomString', profile_picture: 'http://www.anaivanovic.com/sites/default/files/styles/flexslider_full_mobile/public/profile.jpg?itok=50Q_EqHf', created_at: '2018-11-17 10:23:45'},
      ]);
    });
};