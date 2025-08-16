const Url = require('../models/Url');

/**
 * @desc    Get all links created by the currently logged-in user.
 * @route   GET /api/links/my-links
 * @access  Private
 */

const getMyLinks = async (req,res)=>{
    try{
        //
        if(!req.user){
            return res.status(401).json({success : false,message : 'not authorized to access the route'});
        }
        
        const links = await Url.find({user: req.user.id}).sort({date:-1});

        res.status(200).json({
            success : true,
            clicks: links.length,
            data : links,
        })
    }
    catch(err){
        console.error('error fetching user links',err);
        res.status(500).json({success : false,message : 'internal server error'});
    }
}

module.exports = {
    getMyLinks,
}