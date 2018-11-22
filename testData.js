var cd = new Date()
var fullDate = `${cd.getUTCFullYear()}-${cd.getMonth()+1}-${cd.getDate()} ${cd.getHours()-8}:${cd.getMinutes()}:${cd.getSeconds()}`
console.log(fullDate);
