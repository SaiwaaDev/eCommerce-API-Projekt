import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const isMongoDuplicateError = (error: unknown): error is { code: number; keyValue?: Record<string, unknown> } => {
  return typeof error === 'object' && error !== null && 'code' in error;
};

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  // Eigene API-Fehler mit bereits definiertem HTTP-Status sauber ausgeben.
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  // Zod liefert validierungsbezogene Details, die wir zu einer klaren Meldung zusammenfassen.
  if (error instanceof ZodError) {
    const details = error.issues.map(issue => ({
      path: issue.path.join('.'),
      message: issue.message
    }));

    res.status(400).json({
      error: 'Validierungsfehler',
      details
    });
    return;
  }

  // Klassischer Mongo-Duplikatfehler (z. B. bei unique E-Mail).
  if (isMongoDuplicateError(error) && error.code === 11000) {
    const duplicateKey = Object.keys(error.keyValue ?? {})[0] ?? 'Feld';
    res.status(409).json({ error: `${duplicateKey} ist bereits vorhanden.` });
    return;
  }

  // Ungueltige ObjectId, die von Mongoose geworfen wird.
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: `Ungueltige ID fuer Feld '${error.path}'.` });
    return;
  }

  console.error('Unbehandelter Fehler:', error);
  res.status(500).json({ error: 'Interner Serverfehler' });
};
