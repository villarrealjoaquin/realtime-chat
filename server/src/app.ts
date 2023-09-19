import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.ts';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(bodyParser.json());
app.use('/api', authRoutes);

export default app;
