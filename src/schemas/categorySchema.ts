import { z } from 'zod';
import { objectIdSchema } from './common.ts';

export const categoryParamsSchema = z.object({
  id: objectIdSchema
});

export const createCategoryBodySchema = z.object({
  name: z.string().trim().min(1, 'Kategoriename ist erforderlich.')
});

export const updateCategoryBodySchema = z.object({
  name: z.string().trim().min(1, 'Kategoriename ist erforderlich.')
});
