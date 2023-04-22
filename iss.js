const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  // Get Location IP Address
  const fetchMyIP = function(callback) {
    // use request to fetch IP address from JSON API
    request('https://api.ipify.org/?format=json', (error, response, body) => {

      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const data = JSON.parse(body);
      return callback(null, data.ip);
    });
  };

  // Get Coordinates
  const fetchCoordsByIP = function(ip, callback) {
    request(`http://ipwho.is/${ip}`, (error, response, body) => {
      const success = JSON.parse(body).success;
      const message = JSON.parse(body).message;

      if (!success) {
        // Check if the coord request is a failure
        callback(`${message} for ${ip}`, null);
        return;
      }
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      let coordinates = {};
      coordinates.latitude = JSON.parse(body).latitude.toString();
      coordinates.longitude = JSON.parse(body).longitude.toString();
      return callback(null, coordinates);
    });

  };

  // Get ISS Fly Over Data
  const fetchISSFlyOverTimes = function(coords, callback) {
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
      const success = JSON.parse(body).message;
      if (success !== 'success') {
        // Check if the coord request is a failure
        callback(`Fail to get data for ${latitude}, ${longitude}.`, null);
        return;
      }
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const rise = JSON.parse(body).response;
      callback(null, rise);
    });
  };

  // Start calling internal functions
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
  
    // Call for coordinates
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("Error fetching coordinates:", error);
        return;
      }
  
      // Call for fly over times
      fetchISSFlyOverTimes(coords, (error, rise) => {
        if (error) {
          console.log("Error fetching rise:", error);
          return;
        }

        // Return results to index.js
        callback(null, rise);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };