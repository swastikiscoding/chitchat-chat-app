import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { app, server, io } from './lib/socket.js';
import path from 'path';

dotenv.config()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Increase payload size limits for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Set up CORS for production
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? true 
        : ['http://localhost:5173', 'https://dwnk4mq4-5173.inc1.devtunnels.ms'],
    credentials: true
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Add a health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', env: process.env.NODE_ENV });
});

// Set up static files for production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

// Connect to database first, then start server
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    });