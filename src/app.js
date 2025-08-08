const express = require('express');
const app = express();

// Import des contrôleurs
const usersRouter = require('./controllers/UsersController');
const eventsRouter = require('./controllers/EventsController');
const commentsRouter = require('./controllers/CommentsController');
const rsvpRouter = require('./controllers/RSVPController');

// Middleware
app.use(express.json());

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Event Management fonctionnelle!',
    endpoints: {
      users: '/api/users',
      events: '/api/events',
      comments: '/api/comments',
      rsvp: '/api/rsvp'
    }
  });
});

// Routes API
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/rsvp', rsvpRouter);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

module.exports = app;