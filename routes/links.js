const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

/**
 * @route   GET /api/links/my-links
 * @desc    Get all links created by the logged-in user
 * @access  Private (will be protected in the next task)
 */

const {getMyLinks}=require('../controllers/linksController');


router.get('/my-links',auth,getMyLinks);

module.exports = router;