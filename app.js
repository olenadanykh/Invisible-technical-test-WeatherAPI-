
const locations = require('./src/components/locations/location');
const getWeatherByPostalCode = require('./src/components/weather/weather');


Promise.all(getWeatherByPostalCode(locations))
  .then((result) => {
    result.forEach((curr) => {
      console.log(`The weather is ${curr.weather} °C on ${curr.currDate} at ${curr.locationName}, ${curr.postCode}`);
    });
  })
  .catch(err => console.log(err));
