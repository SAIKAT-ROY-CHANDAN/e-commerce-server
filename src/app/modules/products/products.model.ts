import { Schema, model } from "mongoose";
import { TInventory, TOrder, TProduct, TVariants } from './products.interface'

const variantSchema = new Schema<TVariants>({
    type: { type: String, required: true },
    value: { type: String, required: true },
})

const inventorySchema = new Schema<TInventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
});

const productSchema = new Schema<TProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [variantSchema], required: true },
    inventory: { type: inventorySchema, required: true }
})

const orderSchema = new Schema<TOrder>({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

const Order = model<TOrder>('Order', orderSchema)
const Product = model<TProduct>('Product', productSchema);

export {Product, Order}