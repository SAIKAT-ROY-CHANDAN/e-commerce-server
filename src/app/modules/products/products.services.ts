import { TOrder, TProduct } from "./products.interface";
import { Order, Product } from "./products.model";


const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData)
    return result
}

const getProductFromDB = async (searchParams?: any) => {
    let query = {};

    if (searchParams) {
        query = {
            $or: [
                { name: { $regex: new RegExp(searchParams, 'i') } },
                { description: { $regex: new RegExp(searchParams, 'i') } },
                { category: { $regex: new RegExp(searchParams, 'i') } },
            ]
        }
    }

    const result = await Product.find(query)

    if (result.length === 0) {
        throw new Error('Result not found')
    }
    
    return result
}

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findOne({ _id: id })
    return result
}

const updateSingleProductFromDB = async (id: string, updateData: any) => {
    const result = await Product.findOneAndUpdate(
        { _id: id }, updateData, { new: true })
    return result
}

const deleteSingleProductFromDB = async (id: string) => {
    const result = await Product.findOneAndDelete({ _id: id })
    return result
}

const createOrderFromDB = async (orderData: TOrder) => {
    const { productId, quantity } = orderData;
    let product = await Product.findOne({ _id: productId });

    if (!product) {
        throw new Error("Product not Found")
    }

    if (product.inventory.quantity < quantity) {
        throw new Error('Insufficient quantityInsufficient quantity available in inventory')
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

export const ProductServices = {
    createProductIntoDB,
    getProductFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
    createOrderFromDB,
    getOrderFromDB
}