const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
/**
 * @route   GET /api/links/my-links
 * @desc    Get all links created by the logged-in user
 * @access  Private (will be protected in the next task)
 */

router.get('/my-links',auth,(req,res)=>{

    res.status(200).json({success : true , messgae : 'my links is working!{midddleware also applied}',});
});

module.exports = router;