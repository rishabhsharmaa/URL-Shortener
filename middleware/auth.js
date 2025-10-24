const jwt = require('jsonwebtoken');

/**
 * @desc Middleware to verify JWT from the client
 * @usage Attach decoded user data to req.user if valid
 */
const auth = (req, res, next) => {
    // Support token in either custom header 'x-auth-token' or standard 'Authorization: Bearer <token>'
    let token = req.header('x-auth-token');

    if (!token) {
        const authHeader = req.header('Authorization') || req.header('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1].trim();
        }
    }

    // If still no token, proceed without attaching user (some routes may allow anonymous access)
    if (!token) {
        return next();
    }

    try {
        // Verifying token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attaching user to request
        req.user = decoded.user;

        // Continue to next middleware
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
