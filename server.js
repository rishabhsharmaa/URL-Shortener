import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import urlRoutes from './routes/urls.js';
import authRoutes from './routes/auth.js';
import linksRoutes from './routes/links.js';
import indexRoutes from './routes/index.js';
import errorHandler from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://your-frontend-project.vercel.app'
  ],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('API is running on Vercel!');
});

app.use('/api', urlRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/links', linksRoutes);
app.use('/', indexRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;



// Only listen on a port if running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is running locally on port ${PORT}`));
}
