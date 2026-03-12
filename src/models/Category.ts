import { Schema, model } from 'mongoose';

export interface ICategory {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const CategoryModel = model<ICategory>('Category', categorySchema);
