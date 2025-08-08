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
router.post('/', auth, async (req, res) => {
  const { title, description, date } = req.body;
  
  // Validation simple
  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }

  try {
    // Insertion dans la base de données
    const result = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO events (title, description, date, userId) VALUES (?, ?, ?, ?)',
        [title, description, date, req.user.id], // req.user vient du middleware auth
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    res.status(201).json({
      id: result,
      title,
      date,
      userId: req.user.id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
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