const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json')
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`)
}

const fetchISSFlyOverTimes = (body) => {
  const coordinates = {
    latitude: JSON.parse(body).latitude,
    longitude: JSON.parse(body).longitude
  };
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

const printPassTimes = (passTimes) => { 
  for (let i in passTimes) {
    const dateRisetime = new Date(0);
    dateRisetime.setUTCSeconds(passTimes[i]['risetime']);
    console.log(`Next pass at ${dateRisetime} for ${passTimes[i]['duration']} seconds.`);
  };
};

module.exports = { 
  nextISSTimesForMyLocation,
  printPassTimes
};

