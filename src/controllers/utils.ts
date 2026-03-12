import type { Response } from 'express';
import { Types } from 'mongoose';
import { ApiError } from '#middleware';

export const requireObjectId = (id: string, fieldName = 'id'): Types.ObjectId => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Ungueltige ${fieldName}.`);
  }

  return new Types.ObjectId(id);
};

export const notFound = (resource: string): never => {
  throw new ApiError(404, `${resource} wurde nicht gefunden.`);
};

export const sendDeleted = (res: Response): void => {
  res.status(204).send();
};
