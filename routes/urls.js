const express = require('express');
const router = express.Router();
// --- ADD THIS IMPORT ---
// Import our newly flexible auth middleware
const auth = require('../middleware/auth');

// Import the controller function
const { shortenUrl } = require('../controllers/urlController');

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public (but tracks user if logged in)
 */
// --- UPDATE THIS LINE ---
// We insert the 'auth' middleware before our controller function.
// Express will run them in sequence: first auth, then shortenUrl.
router.post('/shorten', auth, shortenUrl);

module.exports = router;