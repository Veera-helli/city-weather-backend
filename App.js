const express = require('express');
const app = express();
const cors = require('cors');
const locationsRouter = require('./controllers/cities');
const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/locations', locationsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
