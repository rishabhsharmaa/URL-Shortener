const jwt = require('jsonwebtoken');

/**
 * @desc This middleware function verifies the JWT sent by the client.
 * If the token is valid, it attaches the decoded user payload to the request object.
 * If the token is missing or invalid, it sends a 401 Unauthorized response.
 */


const token = req.header('x-auth-token');

if(!token){

    return res.status(401).json({
        success : false , 
        message : 'no token given , authorization failed!',
    });
};

try{

    const decode = jwt.verify(token,process.env.JWT_SECRET);

    //after successsful token match , user will be granted with the data
    req.user = decode.user;

    next();
}
catch(err){
    console.error('invalid token',err.message);
    res.status(401).json({success : false , message : 'invalid token!',
    })
}