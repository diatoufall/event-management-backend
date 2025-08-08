const express = require('express');
const router = express.Router();

// Route d'inscription
router.post('/register', (req, res) => {
    res.json({ id: 1, message: 'User registered successfully' });
});

module.exports = router;
