import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide credentials' });
        }
        const user = await User.findOne({ email }).select('+password');
            if (!user) {
                const err = new Error('Incorrect login credentials!');
                err.statusCode = 400;
                return next(err);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                const err = new Error('Invalid credentials');
                err.statusCode = 401;
                return next(err);
            }
        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(200).json({ success: true, token });
    } catch (err) {
        next(err);
    }
};
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with the same email already exists!' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({
            success: true,
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (err) {
        next(err);
    }
};