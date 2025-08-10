const express = require('express');

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */

router.post('/register', (req, res) => {
  
  res.status(200).json({ success: true, message: 'Register route is working!' });
});


module.exports = router;