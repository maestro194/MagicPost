import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import gmRouter from './routes/gm.route.js'
import wmRouter from './routes/wm.route.js'
import omRouter from './routes/om.route.js'
import weRouter from './routes/we.route.js'
import oeRouter from './routes/oe.route.js'
import transactionRouter from './routes/transaction.route.js'

dotenv.config();

// data import
import { users } from './data/userData.js'
import { offices } from './data/officeData.js'
import User from './models/user.model.js';
import Office from './models/office.model.js';

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDB connected");

        // ONLY INSERT DATA ONCE
        // (inserted data)
        // User.insertMany(users)
        // Office.insertMany(offices)
        // (delete all data)
        // User.deleteMany({})
        // Office.deleteMany({})
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();

app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 5173')
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/gm', gmRouter);
app.use('/api/wm', wmRouter);
app.use('/api/om', omRouter);
app.use('/api/we', weRouter);
app.use('/api/oe', oeRouter);
app.use('/api/transaction', transactionRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
    });
})