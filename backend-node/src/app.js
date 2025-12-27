const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/authRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const orderRoutes = require('./routes/orderRoutes');

const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Cho phép tất cả origins để Google Docs Viewer có thể truy cập
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ai', aiRoutes);

// Download alias to match prompt requirement: /api/download/:lessonId
// Maps to /api/lessons/download/:id
const { authenticate } = require('./middleware/authMiddleware');
const { downloadLesson, viewLesson } = require('./controllers/lessonController');
app.get('/api/download/:id', downloadLesson);
app.get('/api/files/:id/view', viewLesson);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Web Giao An Mam Non API (Node.js) is running' });
});

module.exports = app;
