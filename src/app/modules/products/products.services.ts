import { TOrder } from "../orders/order.interface";
import Order from "../orders/order.model";
import { TProduct } from "./products.interface";
import Product from "./products.model";



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


export const ProductServices = {
    createProductIntoDB,
    getProductFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
}