import { Router } from 'express';
import { userRouter } from './userRouter.ts';
import { categoryRouter } from './categoryRouter.ts';
import { productRouter } from './productRouter.ts';
import { orderRouter } from './orderRouter.ts';

export const apiRouter = Router();

// Prefix pro Ressource fuer eine klare API-Struktur unter /api.
apiRouter.use('/users', userRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/orders', orderRouter);
