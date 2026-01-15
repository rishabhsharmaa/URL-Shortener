import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// --- FIX 1: Create __dirname for ES Modules (Prevents crash if you serve files) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Database
connectDB();

const app = express();
app.use(express.json());

// --- FIX 2: Update CORS for Production ---
// This allows connections from Localhost OR your live Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://your-frontend-project.vercel.app' // <--- REPLACE THIS with your actual Frontend URL later
  ],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('API is running on Vercel!');
});

// Routes
import urlRoutes from './routes/urls.js';
app.use('/api', urlRoutes);

import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

import linksRoutes from './routes/links.js';
app.use('/api/links', linksRoutes);

import indexRoutes from './routes/index.js';
app.use('/', indexRoutes);

// Error Handling
import errorHandler from './middleware/errorMiddleware.js';
app.use(errorHandler);

// --- FIX 3: Vercel Export Setup ---
// Vercel requires exporting the app, NOT listening continuously
export default app;

// Only listen on a port if running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is running locally on port ${PORT}`));
}
