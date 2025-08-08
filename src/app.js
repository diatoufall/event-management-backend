const express = require('express');
const app = express();
const usersRouter = require('./controllers/UsersController');
const eventsRouter = require('./controllers/EventsController');

// Middlewares
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;