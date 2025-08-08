const express = require('express');
const db = require('../models/db');
const auth = require('../middlewares/auth');
const router = express.Router();


router.post('/', auth, (req, res) => {
  const { content, eventId } = req.body;
  
  if (!content || !eventId) {
    return res.status(400).json({ error: 'Content and eventId are required' });
  }

  db.run(
    'INSERT INTO comments (content, eventId, userId) VALUES (?, ?, ?)',
    [content, eventId, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        content,
        eventId,
        userId: req.user.id
      });
    }
  );
});


router.get('/event/:eventId', auth, (req, res) => {
  const { eventId } = req.params;

  db.all(
    `SELECT c.*, u.username 
     FROM comments c
     JOIN users u ON c.userId = u.id
     WHERE c.eventId = ?`,
    [eventId],
    (err, comments) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(comments);
    }
  );
});


router.delete('/:id', auth, (req, res) => {
  db.run(
    'DELETE FROM comments WHERE id = ? AND userId = ?',
    [req.params.id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Comment not found or not authorized' });
      }
      res.json({ message: 'Comment deleted successfully' });
    }
  );
});

module.exports = router;