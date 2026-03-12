import type { Request, Response } from 'express';
import { Types } from 'mongoose';
import { OrderModel, ProductModel, UserModel } from '#models';
import { ApiError } from '#middleware';
import { notFound, requireObjectId, sendDeleted } from './utils.ts';
import type { createOrderBodySchema, orderParamsSchema, updateOrderBodySchema } from '#schemas';
import type { z } from 'zod';

type InputOrderItem = {
  productId: string;
  quantity: number;
};

const mapOrderResponse = (order: {
  _id: { toString(): string };
  userId: { toString(): string };
  products: Array<{ productId: { toString(): string }; quantity: number }>;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: order._id.toString(),
  userId: order.userId.toString(),
  products: order.products.map(item => ({
    productId: item.productId.toString(),
    quantity: item.quantity
  })),
  totalAmount: order.totalAmount,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt
});

const ensureUserExists = async (userId: string): Promise<Types.ObjectId> => {
  const normalizedUserId = requireObjectId(userId, 'User-ID');
  const userExists = await UserModel.exists({ _id: normalizedUserId });

  if (!userExists) {
    throw new ApiError(400, 'Der angegebene Benutzer existiert nicht.');
  }

  return normalizedUserId;
};

const calculateOrderTotal = async (products: InputOrderItem[]) => {
  const normalizedProducts = products.map(item => ({
    productId: requireObjectId(item.productId, 'Produkt-ID'),
    quantity: item.quantity
  }));

  const uniqueProductIds = [...new Set(normalizedProducts.map(item => item.productId.toString()))];
  const dbProducts = await ProductModel.find({ _id: { $in: uniqueProductIds } })
    .select('price')
    .lean();

  // FR017: Jede Produkt-ID in der Bestellung muss real existieren.
  if (dbProducts.length !== uniqueProductIds.length) {
    throw new ApiError(400, 'Mindestens ein Produkt in der Bestellung existiert nicht.');
  }

  const priceById = new Map(dbProducts.map(product => [product._id.toString(), product.price]));

  // FR018: Gesamtsumme serverseitig aus aktuellen Produktpreisen berechnen.
  const totalAmount = normalizedProducts.reduce((sum, item) => {
    const price = priceById.get(item.productId.toString());
    if (price === undefined) {
      throw new ApiError(400, 'Produktpreis konnte nicht ermittelt werden.');
    }

    return sum + price * item.quantity;
  }, 0);

  return {
    normalizedProducts,
    totalAmount
  };
};

export const getOrders = async (_req: Request, res: Response): Promise<void> => {
  const orders = await OrderModel.find().lean();
  res.json(orders.map(mapOrderResponse));
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const body = req.validated.body as z.infer<typeof createOrderBodySchema>;

  const userId = await ensureUserExists(body.userId);
  const { normalizedProducts, totalAmount } = await calculateOrderTotal(body.products);

  const order = await OrderModel.create({
    userId,
    products: normalizedProducts,
    totalAmount
  });

  res.status(201).json(mapOrderResponse(order));
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof orderParamsSchema>;
  const orderId = requireObjectId(params.id, 'Bestell-ID');

  const order = await OrderModel.findById(orderId).lean();
  if (!order) {
    notFound('Bestellung');
    return;
  }

  res.json(mapOrderResponse(order));
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof orderParamsSchema>;
  const body = req.validated.body as z.infer<typeof updateOrderBodySchema>;
  const orderId = requireObjectId(params.id, 'Bestell-ID');

  const existingOrder = await OrderModel.findById(orderId).lean();
  if (!existingOrder) {
    notFound('Bestellung');
    return;
  }

  const effectiveUserId = body.userId ?? existingOrder.userId.toString();
  const effectiveProducts = body.products
    ? body.products
    : existingOrder.products.map(item => ({
        productId: item.productId.toString(),
        quantity: item.quantity
      }));

  const userId = await ensureUserExists(effectiveUserId);
  const { normalizedProducts, totalAmount } = await calculateOrderTotal(effectiveProducts);

  const updatedOrder = await OrderModel.findByIdAndUpdate(
    orderId,
    {
      userId,
      products: normalizedProducts,
      totalAmount
    },
    {
      new: true,
      runValidators: true
    }
  ).lean();

  if (!updatedOrder) {
    notFound('Bestellung');
    return;
  }

  res.json(mapOrderResponse(updatedOrder));
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const params = req.validated.params as z.infer<typeof orderParamsSchema>;
  const orderId = requireObjectId(params.id, 'Bestell-ID');

  const order = await OrderModel.findByIdAndDelete(orderId);
  if (!order) {
    notFound('Bestellung');
  }

  sendDeleted(res);
};
