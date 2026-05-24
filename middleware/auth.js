import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  let token = req.header('x-auth-token');

  if (!token) {
    const authHeader = req.header('Authorization') || req.header('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1].trim();
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided. Authorization required.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Invalid token', err.message);
    res.status(401).json({
      success: false,
      message: 'Invalid token!',
    });
  }
};

export { auth };
export default auth; // ← add this