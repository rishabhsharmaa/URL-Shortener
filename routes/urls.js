import express from 'express';
import { createUrl, getUrl, getAllUrls, deleteUrl } from '../controllers/urlController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createUrl);
router.get('/:id', getUrl);
router.get('/', auth, getAllUrls);
router.delete('/:id', auth, deleteUrl);

export default router;