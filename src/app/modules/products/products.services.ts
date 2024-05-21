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

const getSingleProductFromDb = async (id: string) => {
    const result = await Product.findOne({ _id: id })
    return result
}

const updateSingleProductFromDb = async (id: string, updateData: any) => {
    console.log(updateData);
    const result = await Product.findOneAndUpdate(
        { _id: id }, { $set: { field: updateData } }, { new: true })
        console.log(result);
    return result
}

export const ProductServices = {
    createProductIntoDB,
    getProductFromDB,
    getSingleProductFromDb,
    updateSingleProductFromDb
}