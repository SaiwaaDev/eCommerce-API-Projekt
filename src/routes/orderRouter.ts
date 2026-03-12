import { Router } from 'express';
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from '#controllers';
import { validateRequest } from '#middleware';
import { createOrderBodySchema, orderParamsSchema, updateOrderBodySchema } from '#schemas';

export const orderRouter = Router();

orderRouter.get('/', getOrders);

orderRouter.post('/', validateRequest({ body: createOrderBodySchema }), createOrder);

orderRouter.get('/:id', validateRequest({ params: orderParamsSchema }), getOrderById);

orderRouter.put(
  '/:id',
  validateRequest({
    params: orderParamsSchema,
    body: updateOrderBodySchema
  }),
  updateOrder
);

orderRouter.delete('/:id', validateRequest({ params: orderParamsSchema }), deleteOrder);
