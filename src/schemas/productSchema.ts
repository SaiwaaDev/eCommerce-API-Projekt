import { z } from 'zod';
import { objectIdSchema } from './common.ts';

export const productParamsSchema = z.object({
  id: objectIdSchema
});

export const productQuerySchema = z.object({
  categoryId: objectIdSchema.optional()
});

export const createProductBodySchema = z.object({
  name: z.string().trim().min(1, 'Produktname ist erforderlich.'),
  description: z.string().trim().min(1, 'Beschreibung ist erforderlich.'),
  price: z.number().nonnegative('Preis darf nicht negativ sein.'),
  categoryId: objectIdSchema
});

export const updateProductBodySchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    price: z.number().nonnegative('Preis darf nicht negativ sein.').optional(),
    categoryId: objectIdSchema.optional()
  })
  .refine(value => Object.keys(value).length > 0, {
    message: 'Mindestens ein Feld zum Aktualisieren angeben.'
  });
