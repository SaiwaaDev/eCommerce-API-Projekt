import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '#controllers';
import { validateRequest } from '#middleware';
import { categoryParamsSchema, createCategoryBodySchema, updateCategoryBodySchema } from '#schemas';

export const categoryRouter = Router();

categoryRouter.get('/', getCategories);

categoryRouter.post('/', validateRequest({ body: createCategoryBodySchema }), createCategory);

categoryRouter.get('/:id', validateRequest({ params: categoryParamsSchema }), getCategoryById);

categoryRouter.put(
  '/:id',
  validateRequest({
    params: categoryParamsSchema,
    body: updateCategoryBodySchema
  }),
  updateCategory
);

categoryRouter.delete('/:id', validateRequest({ params: categoryParamsSchema }), deleteCategory);
