import { Request, Response } from "express";
import { ProductServices } from "./products.services";
import { orderValidationSchema, productValidationSchema } from "./products.valiations";
import { z } from "zod";

const createProduct = async (req: Request, res: Response) => {
    try {
        const ProductData = req.body;

        const zodParsedData = productValidationSchema.parse(ProductData)
        const result = await ProductServices.createProductIntoDB(zodParsedData)

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
        const searchParams = req.query.searchTerm;

        const result = await ProductServices.getProductFromDB(searchParams);

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        })
    } catch (error) {
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

        const zodParseUpdatedData = productValidationSchema.parse(updateData)
        const result = await ProductServices.updateSingleProductFromDB(productsId, zodParseUpdatedData)

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
        await ProductServices.deleteSingleProductFromDB(productsId);

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

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const zodOrderParsedData = orderValidationSchema.parse(orderData)
        const result = await ProductServices.createOrderFromDB(zodOrderParsedData)

        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result
        })
    } catch (error) {

// To handle multiple error and send appropriate response error i have implement the if else condition to handle gracefully.

        if ((error as Error).message === 'Product not Found') {
            res.status(404).json({
                success: false,
                message: (error as Error).message
            });
        } else if ((error as Error).message === 'Insufficient quantity available in inventory') {
            res.status(400).json({
                success: false,
                message: (error as Error).message
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to create order',
            })
        }
    }
}

const getOrders = async (req: Request, res: Response) => {
    try {
        const searchEmailParams = req.query.email
        const result = await ProductServices.getOrderFromDB(searchEmailParams);

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result
        })
        return result
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Order not found!",
        })
    }
}

export default {
    createProduct,
    getStudents,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    createOrder,
    getOrders
}