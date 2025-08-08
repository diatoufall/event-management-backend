const express = require('express');
const db = require('../models/db');
const auth = require('../middlewares/auth');
const router = express.Router();

// Create Event (Protégé par JWT)
router.post('/', auth, (req, res) => {
  const { title, description, date } = req.body;
  db.run(
    'INSERT INTO events (title, description, date, userId) VALUES (?, ?, ?, ?)',
    [title, description, date, req.user.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});
router.post('/login', (req, res) => {
  // Votre code de connexion (avec JWT)
});
// Get User's Events
router.get('/', auth, (req, res) => {
  db.all(
    'SELECT * FROM events WHERE userId = ?',
    [req.user.id],
    (err, events) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(events);
    }
  );
});

module.exports = router;