const hv = require('haversine');

const user1 = {
  latitude: 30.849635,
  longitude: -83.24559
}

const user2 = {
  latitude: 27.950575,
  longitude: -82.457178
}

console.log(hv(user1,user2, {unit: 'meter'}))
