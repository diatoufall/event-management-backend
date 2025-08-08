const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Import corrigé
const usersRouter = require('./src/controllers/UsersController');

// Routes
app.use('/api/users', usersRouter);

// Route test
app.get('/', (req, res) => {
  res.json({ status: 'API working' });
});

module.exports = app;
