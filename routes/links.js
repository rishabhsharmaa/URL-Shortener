const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMyLinks } = require('../controllers/linksController');

// Route for fetching user’s links
// Full URL: GET /api/links/my-links
router.get('/my-links', auth, getMyLinks);

module.exports = router;
