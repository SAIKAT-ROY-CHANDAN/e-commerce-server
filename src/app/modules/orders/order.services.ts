import Product from "../products/products.model";
import { TOrder } from "./order.interface";
import Order from "./order.model";

const createOrderFromDB = async (orderData: TOrder) => {
    const { productId, quantity } = orderData;
    let product = await Product.findOne({ _id: productId });

    if (!product) {
        throw new Error("Product not Found")
    }

    if (product.inventory.quantity < quantity) {
        throw new Error('Insufficient quantity available in inventory')
    }

    product.inventory.quantity -= quantity

    if (product.inventory.quantity === 0) {
        product.inventory.inStock = false
    }

    await product.save();
    const result = await Order.create(orderData)
    return result
}

const getOrderFromDB = async (email: any) => {

    let query = {}

    if (email) {
        // query = {email: {$regex: new RegExp(email, 'i')}}
        query = { email: email }
    }

    const result = await Order.find(query)

    if (result.length === 0) {
        throw new Error('Result not found')
    }


    return result
}

export const OrderServices = {
    createOrderFromDB,
    getOrderFromDB
}
