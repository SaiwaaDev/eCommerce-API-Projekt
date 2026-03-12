import { z } from 'zod';
import { objectIdSchema } from './common.ts';

export const orderParamsSchema = z.object({
  id: objectIdSchema
});

const orderProductSchema = z.object({
  productId: objectIdSchema,
  quantity: z.number().int().positive('Menge muss groesser als 0 sein.')
});

export const createOrderBodySchema = z.object({
  userId: objectIdSchema,
  products: z.array(orderProductSchema).min(1, 'Mindestens ein Produkt ist erforderlich.')
});

export const updateOrderBodySchema = z
  .object({
    userId: objectIdSchema.optional(),
    products: z.array(orderProductSchema).min(1, 'Mindestens ein Produkt ist erforderlich.').optional()
  })
  .refine(value => Object.keys(value).length > 0, {
    message: 'Mindestens ein Feld zum Aktualisieren angeben.'
  });
