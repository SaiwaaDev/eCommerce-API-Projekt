import type { Request, Response } from 'express';
import { CategoryModel } from '#models';
import { notFound, requireObjectId, sendDeleted } from './utils.ts';
import type { categoryParamsSchema, createCategoryBodySchema, updateCategoryBodySchema } from '#schemas';
import type { z } from 'zod';

const mapCategoryResponse = (category: {
  _id: { toString(): string };
  name: string;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: category._id.toString(),
  name: category.name,
  createdAt: category.createdAt,
  updatedAt: category.updatedAt
});

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  const categories = await CategoryModel.find().lean();
  res.json(categories.map(mapCategoryResponse));
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const body = req.validated.body as z.infer<typeof createCategoryBodySchema>;

  const category = await CategoryModel.create(body);
  res.status(201).json(mapCategoryResponse(category));
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof categoryParamsSchema>;
  const categoryId = requireObjectId(params.id, 'Kategorie-ID');

  const category = await CategoryModel.findById(categoryId).lean();
  if (!category) {
    notFound('Kategorie');
    return;
  }

  res.json(mapCategoryResponse(category));
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof categoryParamsSchema>;
  const body = req.validated.body as z.infer<typeof updateCategoryBodySchema>;
  const categoryId = requireObjectId(params.id, 'Kategorie-ID');

  const category = await CategoryModel.findByIdAndUpdate(categoryId, body, {
    new: true,
    runValidators: true
  }).lean();

  if (!category) {
    notFound('Kategorie');
    return;
  }

  res.json(mapCategoryResponse(category));
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof categoryParamsSchema>;
  const categoryId = requireObjectId(params.id, 'Kategorie-ID');

  const category = await CategoryModel.findByIdAndDelete(categoryId);
  if (!category) {
    notFound('Kategorie');
  }

  sendDeleted(res);
};
