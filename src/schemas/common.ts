import { z } from 'zod';

// Einheitliches ObjectId-Schema fuer Params und Referenzen.
export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Muss eine gueltige MongoDB ObjectId sein.');
