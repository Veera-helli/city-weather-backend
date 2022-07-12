const axios = require('axios').default;
const locationsRouter = require('express').Router();
require('dotenv').config();

locationsRouter.get('/:location', async (request, response) => {
  console.log('in the router');
  const loc = 'Helsinki';
  const req1 = await axios
    .get(
      `${process.env.ACCU_URI_LOC}/locations/v1/cities/search?apikey=${process.env.API_KEY}&q=${request.params?.location}`
    )
    .catch((e) => console.log('error in request 1', e));

  if (!req1) {
    response.json('Invalid location');
    return;
  }

  console.log('data >>>>');
  console.log(req1.data);
  console.log('Key >>>');
  console.log(req1.data[0]?.Key);

  console.log('req 2 >>>');
  const req2 = await axios
    .get(
      `${process.env.ACCU_URI_LOC}/forecasts/v1/daily/1day/${req1.data[0]?.Key}?apikey=${process.env.API_KEY}&metric=true`
    )
    .catch((e) => console.log('error in request 2', e));

  console.log(req2?.data);
  response.json(req2?.data || 'Forecast data error');
});

module.exports = locationsRouter;
