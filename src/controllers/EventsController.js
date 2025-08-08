const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Events endpoint');
});

module.exports = router;
