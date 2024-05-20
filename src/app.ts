import cors from 'cors';
import express, { Application, Request, Response } from 'express'

const app: Application = express();

app.use(express.json());
app.use(cors());

const getController = (req: Request, res: Response) => {
    const a = "hello world";
    res.send(a);
}

app.get('/', getController)

export default app;


