import { TProduct } from "./products.interface";
import Product from "./products.model";

const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData)
    return result
}

const getProductFromDB = async () => {
    const result = await Product.find()
    console.log(result);
    return result
}

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findOne({ _id: id })
    return result
}

const updateSingleProductFromDB = async (id: string, updateData: any) => {
    const result = await Product.findOneAndUpdate(
        { _id: id }, updateData,  { new: true })
    return result
}

const deleteSingleProductFromDB = async (id: string) => {
    const result = await Product.findOneAndDelete({_id: id})
    return result
}

export const ProductServices = {
    createProductIntoDB,
    getProductFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB
}