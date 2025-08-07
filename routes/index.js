const express = require('express');

const router = express.Router();

/**
 * @route   GET /:code
 * @desc    Redirect to the long/original URL
 * @access  Public
 */

router.get('/:code',(req,res)=>{
    //we will use object destructing for this to capture code through req.params 
    const {code}=req.params;

    //status json to check if its working 
    res.status(200).json({
        success : true,
        message : 'redirect route is working',
        capturedCode : code,
    })
})
module.exports = router;