import "dotenv/config";
import express from 'express';
import connectDB from './db/connect.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

console.log(process.env.CORS_ORIGIN);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());

connectDB().then(() => {
    console.log('MongoDB connected successfully');
}).catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});

import userRoutes from './routes/userRoutes.js';
import transactionsRoutes from './routes/transactionsRoutes.js';

app.use('/api/v1/user' , userRoutes );
app.use('/api/v1/transactions' , transactionsRoutes );

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
