const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/users', require('./controllers/UsersController'));
app.use('/api/events', require('./controllers/EventsController'));

module.exports = app;
