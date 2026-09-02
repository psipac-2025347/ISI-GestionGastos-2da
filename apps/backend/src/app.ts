import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import incomeRoutes from './modules/income/income.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);

app.use(errorMiddleware);

export default app;