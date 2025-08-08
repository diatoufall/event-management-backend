const express = require('express');
const db = require('../models/db');
const auth = require('../middlewares/auth');
const router = express.Router();


router.post('/', auth, (req, res) => {
  const { eventId, status } = req.body;

  if (!eventId || !status || !['going', 'maybe', 'declined'].includes(status)) {
    return res.status(400).json({ 
      error: 'Valid eventId and status (going/maybe/declined) are required' 
    });
  }

  db.run(
    `INSERT OR REPLACE INTO rsvp 
     (eventId, userId, status) 
     VALUES (?, ?, ?)`,
    [eventId, req.user.id, status],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        id: this.lastID,
        eventId,
        userId: req.user.id,
        status
      });
    }
  );
});

// Récupérer les RSVP d'un événement
router.get('/event/:eventId', auth, (req, res) => {
  const { eventId } = req.params;

  db.all(
    `SELECT r.*, u.username 
     FROM rsvp r
     JOIN users u ON r.userId = u.id
     WHERE r.eventId = ?`,
    [eventId],
    (err, rsvps) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rsvps);
    }
  );
});


router.get('/my-status/:eventId', auth, (req, res) => {
  const { eventId } = req.params;

  db.get(
    'SELECT status FROM rsvp WHERE eventId = ? AND userId = ?',
    [eventId, req.user.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ status: row ? row.status : 'not_responded' });
    }
  );
});

module.exports = router;