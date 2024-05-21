import cors from 'cors';
import express, { Application, Request, Response } from 'express'
import { ProductRoutes } from './app/modules/products/products.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', ProductRoutes)

const getController = (req: Request, res: Response) => {
    const a = "hello world";
    res.send(a);
}

app.get('/', getController)

export default app;


