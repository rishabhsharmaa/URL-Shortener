const jwt = require('jsonwebtoken');

/**
 * @desc Middleware to verify JWT from the client
 * @usage Attach decoded user data to req.user if valid
 */
const auth = (req, res, next) => {
    // getting token from user using header
    const token = req.header('x-auth-token');

    //if no token given
    if (!token) {
        return next();
    }

    try {
        // Verifying token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attaching user to request
        req.user = decoded.user;

        // Continue to next midddleware
        next();
    } catch (err) {
        console.error('Invalid token', err.message);
        res.status(401).json({
            success: false,
            message: 'Invalid token!',
        });
    }
};

module.exports = auth;
