import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

export default app;