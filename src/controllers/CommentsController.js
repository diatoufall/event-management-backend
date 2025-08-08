const express = require('express');
const db = require('../models/db');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, (req, res) => {
  // Implémentez la création de commentaire
});

router.get('/event/:eventId', auth, (req, res) => {
  // Implémentez la récupération des commentaires
});

module.exports = router;