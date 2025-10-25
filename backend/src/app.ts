import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import customersRouter from './routes/customers.routes';
import menuRouter from './routes/menu.routes';
import ordersRouter from './routes/orders.routes';
import complaintsRouter from './routes/complaints.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => res.send({ status: 'ok' }));

app.use('/api/customers', customersRouter);
app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/complaints', complaintsRouter);

export default app;