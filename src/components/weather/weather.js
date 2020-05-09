const http = require('http');

const convertKelvinToCelsius = (kelvin) => {
  if (kelvin < (0)) {
    return 'below absolute zero (0 K)';
  }
  return Math.floor(kelvin - 273.15);
};

const getWeatherByPostalCode = (locations) => {
  const allLocations = [];
  locations.forEach((loc) => {
    allLocations.push(
      new Promise((resolve, reject) => {
        const url = new URL(`http://api.openweathermap.org/data/2.5/weather?zip=${loc.postalCode}&appid=3e594963dac7b663e226c97243b79f12`);
        const req = http.get(url, (res) => {
          const { statusCode } = res;

          if (statusCode !== 200) {
            return reject(new Error('Request Failed.\n'
                        + `Status Code: ${statusCode}`));
          }
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            const parsedData = JSON.parse(rawData);
            const data = {
              weather: convertKelvinToCelsius(parsedData.main.temp),
              currDate: new Date(),
              locationName: loc.locationName,
              postCode: loc.postalCode,
            };
            return resolve(data);
          });
        });
        req.on('error', (e) => {
          reject(e);
        });
        req.end();
      }),
    );
  });
  return allLocations;
};


module.exports = getWeatherByPostalCode;
