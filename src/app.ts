import cors from 'cors';
import express, { Application, Request, Response } from 'express'
import { ProductRoutes } from './app/modules/products/products.route';
import { OrderRoutes } from './app/modules/orders/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', ProductRoutes)
app.use('/api', OrderRoutes)

const getController = (req: Request, res: Response) => {
    const a = "Hello From E-commerce Backend";
    res.send(a);
}

app.get('/', getController)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
export default app;


