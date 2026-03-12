import { Schema, model, type Types } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  categoryId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const ProductModel = model<IProduct>('Product', productSchema);
