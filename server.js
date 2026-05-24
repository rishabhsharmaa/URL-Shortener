import './config/env.js'; // ← FIRST LINE
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import urlRoutes from './routes/urls.js';
import linksRoutes from './routes/links.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import Url from './models/Url.js';

// remove dotenv.config() from here

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

connectDB();

// Middleware
app.use(cors({
  origin: ['https://linklytic.vercel.app', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);
app.use('/api/shorten', urlRoutes); // Alias for client/apiService.js compatibility
app.use('/api/links', linksRoutes);

// Root short URL redirection route
app.get('/:shortCode', async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    // Ignore API calls and asset requests
    if (shortCode === 'api' || shortCode === 'favicon.ico') {
      return next();
    }

    const url = await Url.findOne({
      $or: [{ shortCode }, { customAlias: shortCode }],
    });

    if (url) {
      url.clicks += 1;
      await url.save();
      return res.redirect(301, url.originalUrl);
    }

    return res.status(404).json({ success: false, message: 'URL not found' });
  } catch (error) {
    next(error);
  }
});


// Health check endpoint for Vercel
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

