import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import adRoutes from './routes/adRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import cors from 'cors';

dotenv.config();
connectToDatabase();

const app = express();
const port = process.env.PORT || 5174;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/ad', adRoutes);
app.use('/api/user', userRoutes);
app.use('/api/notification', notificationRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Add your error handling middleware as well
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
