const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("Error fetching coordinates:", error);
      return;
    }
    console.log("Retrieved coordinates:", coords);

    fetchISSFlyOverTimes(coords, (error, rise) => {
      if (error) {
        console.log("Error fetching rise:", error);
        return;
      }
      console.log(rise);
    });
  });
});

