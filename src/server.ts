import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import { router } from './routes';
import cors from 'cors'
import path from 'path'
import fileUpload from 'express-fileupload';

const app = express();

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 } //50MB
}))
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error){
        res.status(400).json({
            error: err.message
        })
        return;
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
    return;
})

app.listen(process.env.PORT || 3333, () => console.log("Servidor online ns porta 3333"))