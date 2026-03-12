import { z } from 'zod';
import { objectIdSchema } from './common.ts';

export const userParamsSchema = z.object({
  id: objectIdSchema
});

export const createUserBodySchema = z.object({
  name: z.string().trim().min(1, 'Name ist erforderlich.'),
  email: z.email('Bitte eine gueltige E-Mail angeben.').transform(value => value.toLowerCase()),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben.')
});

export const updateUserBodySchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z
      .email('Bitte eine gueltige E-Mail angeben.')
      .transform(value => value.toLowerCase())
      .optional(),
    password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben.').optional()
  })
  .refine(value => Object.keys(value).length > 0, {
    message: 'Mindestens ein Feld zum Aktualisieren angeben.'
  });
