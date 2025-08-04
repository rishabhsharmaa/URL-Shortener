const express = require('express');

//importing controller function
const {shortenUrl} = require('../controllers/urlController');

//creating new router obj
const router = express.Router();


/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public
 */

//Express will automatically invoke this function with req,res when router is matched
router.post('/shorten',shortenUrl);

module.exports = router;