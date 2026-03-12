import type { Request, Response } from 'express';
import { CategoryModel, ProductModel } from '#models';
import { ApiError } from '#middleware';
import { notFound, requireObjectId, sendDeleted } from './utils.ts';
import type {
  createProductBodySchema,
  productParamsSchema,
  productQuerySchema,
  updateProductBodySchema
} from '#schemas';
import type { z } from 'zod';

const mapProductResponse = (product: {
  _id: { toString(): string };
  name: string;
  description: string;
  price: number;
  categoryId: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: product._id.toString(),
  name: product.name,
  description: product.description,
  price: product.price,
  categoryId: product.categoryId.toString(),
  createdAt: product.createdAt,
  updatedAt: product.updatedAt
});

const ensureCategoryExists = async (categoryId: string): Promise<void> => {
  const normalizedCategoryId = requireObjectId(categoryId, 'Kategorie-ID');
  const categoryExists = await CategoryModel.exists({ _id: normalizedCategoryId });

  // FR016: Produkt darf nur mit existierender Kategorie erstellt/aktualisiert werden.
  if (!categoryExists) {
    throw new ApiError(400, 'Die angegebene Kategorie existiert nicht.');
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  const query = req.validated.query as z.infer<typeof productQuerySchema>;

  const filter = query.categoryId
    ? {
        categoryId: requireObjectId(query.categoryId, 'Kategorie-ID')
      }
    : {};

  const products = await ProductModel.find(filter).lean();
  res.json(products.map(mapProductResponse));
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const body = req.validated.body as z.infer<typeof createProductBodySchema>;

  await ensureCategoryExists(body.categoryId);

  const product = await ProductModel.create({
    name: body.name,
    description: body.description,
    price: body.price,
    categoryId: requireObjectId(body.categoryId, 'Kategorie-ID')
  });

  res.status(201).json(mapProductResponse(product));
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof productParamsSchema>;
  const productId = requireObjectId(params.id, 'Produkt-ID');

  const product = await ProductModel.findById(productId).lean();
  if (!product) {
    notFound('Produkt');
    return;
  }

  res.json(mapProductResponse(product));
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof productParamsSchema>;
  const body = req.validated.body as z.infer<typeof updateProductBodySchema>;
  const productId = requireObjectId(params.id, 'Produkt-ID');

  if (body.categoryId) {
    await ensureCategoryExists(body.categoryId);
  }

  const updateData: Record<string, unknown> = {
    ...body,
    ...(body.categoryId ? { categoryId: requireObjectId(body.categoryId, 'Kategorie-ID') } : {})
  };

  const product = await ProductModel.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true
  }).lean();

  if (!product) {
    notFound('Produkt');
    return;
  }

  res.json(mapProductResponse(product));
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof productParamsSchema>;
  const productId = requireObjectId(params.id, 'Produkt-ID');

  const product = await ProductModel.findByIdAndDelete(productId);
  if (!product) {
    notFound('Produkt');
  }

  sendDeleted(res);
};
