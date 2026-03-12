import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '#controllers';
import { validateRequest } from '#middleware';
import { createUserBodySchema, updateUserBodySchema, userParamsSchema } from '#schemas';

export const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.post('/', validateRequest({ body: createUserBodySchema }), createUser);

userRouter.get('/:id', validateRequest({ params: userParamsSchema }), getUserById);

userRouter.put(
  '/:id',
  validateRequest({
    params: userParamsSchema,
    body: updateUserBodySchema
  }),
  updateUser
);

userRouter.delete('/:id', validateRequest({ params: userParamsSchema }), deleteUser);
