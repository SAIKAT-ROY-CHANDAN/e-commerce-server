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
    console.log(orderData);
    const result = await Order.create(orderData)
    return result
}

const getOrderFromDB = async () => {
    const result = await Order.find()
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