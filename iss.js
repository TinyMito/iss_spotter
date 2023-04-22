/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {

    if (error) {
      return callback(error);
    }
    if (response) {
      //return callback(response);
    }

    const data = JSON.parse(body);
    return callback(null, data);
  })
}

module.exports = { fetchMyIP };
