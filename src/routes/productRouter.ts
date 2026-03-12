import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '#controllers';
import { validateRequest } from '#middleware';
import { createProductBodySchema, productParamsSchema, productQuerySchema, updateProductBodySchema } from '#schemas';

export const productRouter = Router();

productRouter.get('/', validateRequest({ query: productQuerySchema }), getProducts);

productRouter.post('/', validateRequest({ body: createProductBodySchema }), createProduct);

productRouter.get('/:id', validateRequest({ params: productParamsSchema }), getProductById);

productRouter.put(
  '/:id',
  validateRequest({
    params: productParamsSchema,
    body: updateProductBodySchema
  }),
  updateProduct
);

productRouter.delete('/:id', validateRequest({ params: productParamsSchema }), deleteProduct);
