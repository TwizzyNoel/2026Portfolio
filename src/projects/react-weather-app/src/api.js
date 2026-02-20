require('dotenv').config()

export const geoApiOptions = {
  method: "GET",
  headers: {
    'x-rapidapi-key': '7640c5bd20mshe347a9f3bae3eecp1bb2b1jsna250d62f6f5c',
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "a0130f3eff0d7024c63c5fdd4d4628c5";
