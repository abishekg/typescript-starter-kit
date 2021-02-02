import express, {Request, Response, NextFunction} from 'express';
import {customExpressRequest} from '../../@types/express';

const router = express.Router();
import path from 'path';

export default router.get('/', (req: customExpressRequest, res: Response) => {
    res.sendFile(path.join(__dirname + "../../../../public/index.html"));
})
