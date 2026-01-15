import express from 'express';
import auth from '../middleware/auth.js';
import { shortenUrl } from '../controllers/urlController.js';

const router = express.Router();

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public (but tracks user if logged in)
 */
router.post('/shorten', auth, shortenUrl);

export default router;