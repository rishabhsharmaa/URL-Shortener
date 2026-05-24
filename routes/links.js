import express from 'express';
import { getLinks, createLink, deleteLink } from '../controllers/linksController.js';
import { auth } from '../middleware/auth.js';


const router = express.Router();

router.get('/', auth, getLinks);
router.get('/my-links', auth, getLinks); // Added for client/linkService.js compatibility
router.post('/', auth, createLink);
router.delete('/:id', auth, deleteLink);


export default router;
