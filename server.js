
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import connectDB from './config/db.js';
import express from 'express';

connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('API is running with nodemon!');
});

import urlRoutes from './routes/urls.js';
app.use('/api', urlRoutes);

import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

import linksRoutes from './routes/links.js';
app.use('/api/links', linksRoutes);

import indexRoutes from './routes/index.js';
app.use('/', indexRoutes);

import errorHandler from './middleware/errorMiddleware.js';
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is alive and running on port ${PORT}`));