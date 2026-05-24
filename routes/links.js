import express from 'express';
import { getLinks, createLink, deleteLink } from '../controllers/linksController.js';
import { auth } from '../middleware/auth.js';


const router = express.Router();

router.get('/', auth, getLinks);
router.post('/', auth, createLink);
router.delete('/:id', auth, deleteLink);

export default router;
