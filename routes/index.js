import express from 'express';
import authRoutes from './auth.js';
import urlRoutes from './urls.js';
import linksRoutes from './links.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/urls', urlRoutes);
router.use('/links', linksRoutes);

export default router;