
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'Nima', qr_code: 'someRandomString', profile_picture: 'https://pbs.twimg.com/profile_images/825435933889564672/q-wAMGBI_400x400.jpg', created_at: '2018-11-17 10:23:58'},
        {id: 2, first_name: 'Brennan', qr_code: 'someRandomString', profile_picture: 'https://ca.slack-edge.com/T2G8TE2E5-UCQ0R4XPA-d50990b5e4a0-72', created_at: '2018-11-17 10:23:50'},
        {id: 3, first_name: 'Gaurav', qr_code: 'someRandomString', profile_picture: 'https://ca.slack-edge.com/T2G8TE2E5-UCQR7HLBD-5a53da470322-72', created_at: '2018-11-17 10:23:45'},
        {id: 4, first_name: 'Nick', qr_code: 'someRandomString', profile_picture: 'https://ca.slack-edge.com/T2G8TE2E5-UCRTBCT0F-3280e1d3c11b-72', created_at: '2018-11-17 10:23:45'},
        {id: 5, first_name: 'Andrea', qr_code: 'someRandomString', profile_picture: 'https://ca.slack-edge.com/T2G8TE2E5-UCQ5VFXRN-150687f8fe47-72', created_at: '2018-11-17 10:23:45'},
        {id: 6, first_name: 'Rosy', qr_code: 'someRandomString', profile_picture: 'https://ca.slack-edge.com/T2G8TE2E5-U2G8TE2KT-10abc9536f10-72', created_at: '2018-11-17 10:23:45'},
        {id: 7, first_name: 'Rohit', qr_code: 'someRandomString', profile_picture: 'https://ca.slack-edge.com/T2G8TE2E5-U2J4QA3UH-4c03c5935b38-72', created_at: '2018-11-17 10:23:45'},
      ]);
    });
};