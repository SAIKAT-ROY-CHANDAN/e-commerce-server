import { Request, Response } from "express";
import { ProductServices } from "./products.services";

const createProduct = async (req: Request, res: Response) => {
    try {
        const ProductData = req.body;

        const result = await ProductServices.createProductIntoDB(ProductData)

        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something Have gone wrong",
            error: error
        })
    }
}

const getStudents = async (req: Request, res: Response) => {
    try {
        const result = await ProductServices.getProductFromDB();

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something Have gone wrong",
            error: error
        })
    }
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productsId } = req.params;

        const result = await ProductServices.getSingleProductFromDB(productsId)

        res.status(200).json({
            success: true,
            message: "Single Product fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error
        })
    }
}

const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const updateData = req.body;
        const { productsId } = req.params;

        const result = await ProductServices.updateSingleProductFromDB(productsId, updateData)

        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Failed to update Single Product!",
            error: error
        })
    }

}

const deleteSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productsId } = req.params;
        const result = await ProductServices.deleteSingleProductFromDB(productsId);
        
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "There was some problem to delete the Product!",
            error: error
        })
    }

}

export default {
    createProduct,
    getStudents,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct
}