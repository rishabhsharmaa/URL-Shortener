import express from 'express';
import auth from '../middleware/auth.js';
import { getMyLinks } from '../controllers/linksController.js';

const router = express.Router();

// Route for fetching user's links
// Full URL: GET /api/links/my-links
router.get('/my-links', auth, getMyLinks);

export default router;
