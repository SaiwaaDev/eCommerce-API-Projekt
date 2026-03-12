import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '#models';
import { notFound, requireObjectId, sendDeleted } from './utils.ts';
import type { createUserBodySchema, updateUserBodySchema, userParamsSchema } from '#schemas';
import type { z } from 'zod';

const BCRYPT_ROUNDS = 12;

const mapUserResponse = (user: {
  _id: { toString(): string };
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  // FR015: Passwort nicht zurueckgeben und _id in id normalisieren.
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await UserModel.find().select('-password').lean();
  res.json(users.map(mapUserResponse));
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const body = req.validated.body as z.infer<typeof createUserBodySchema>;

  const passwordHash = await bcrypt.hash(body.password, BCRYPT_ROUNDS);

  const user = await UserModel.create({
    name: body.name,
    email: body.email,
    password: passwordHash
  });

  res.status(201).json(mapUserResponse(user));
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof userParamsSchema>;
  const userId = requireObjectId(params.id, 'User-ID');

  const user = await UserModel.findById(userId).select('-password').lean();
  if (!user) {
    notFound('Benutzer');
    return;
  }

  res.json(mapUserResponse(user));
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof userParamsSchema>;
  const body = req.validated.body as z.infer<typeof updateUserBodySchema>;

  const userId = requireObjectId(params.id, 'User-ID');

  const updateData: Record<string, unknown> = { ...body };
  if (body.password) {
    // Auch bei Updates nur den Hash speichern, nie das Klartext-Passwort.
    updateData.password = await bcrypt.hash(body.password, BCRYPT_ROUNDS);
  }

  const user = await UserModel.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true
  })
    .select('-password')
    .lean();

  if (!user) {
    notFound('Benutzer');
    return;
  }

  res.json(mapUserResponse(user));
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof userParamsSchema>;
  const userId = requireObjectId(params.id, 'User-ID');

  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) {
    notFound('Benutzer');
  }

  sendDeleted(res);
};
