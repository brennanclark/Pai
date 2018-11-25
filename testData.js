function distanceFromSource(arr, userId) {
  let distance = 0;
  arr.forEach((item) => {
    if(item.userId == userId) {
      // console.log("============================")
      // console.log("ARRAY ID: ", item.userId, "userId: ", userId, "DISTANCE", item.distance)
      // console.log("THIS IS THE USERID", userId)
      distance = userId
    } 
    else {
      console.log("FAILED======================");
    }
  })
  return distance;
}

array = [
  {
    userId: 2,
    distance: 100,
  }
]

console.log(distanceFromSource(array, 2));