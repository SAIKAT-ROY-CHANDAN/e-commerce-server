import { Request, Response } from "express";
import { OrderServices } from "./order.services";
import orderValidationSchema from "./order.validations";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const zodOrderParsedData = orderValidationSchema.parse(orderData)
        const result = await OrderServices.createOrderFromDB(zodOrderParsedData)

        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result
        })
    } catch (error) {

// To handle multiple error and send appropriate response error i have implement the if else condition to handle gracefully.
        console.log(error);
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
        const result = await OrderServices.getOrderFromDB(searchEmailParams);

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
    createOrder,
    getOrders
}