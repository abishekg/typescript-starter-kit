import express, {Request, Response, NextFunction} from 'express';
import {customExpressRequest} from '../../@types/express';
import asyncHandler from '../../utils/async-handlers';
import { SuccessResponse, InternalErrorResponse } from '../../utils/api-response';
import path from 'path';

const router = express.Router();

router.get('/', (req: customExpressRequest, res: Response) => {
    res.sendFile(path.join(__dirname + "../../../../public/index.html"));
});

router.get('/success', asyncHandler(async (req: customExpressRequest, res) => {
    return new SuccessResponse({data: {one:'1', two: undefined}}).send(res);
}));

router.get('/error', asyncHandler(async (req: customExpressRequest, res) => {
    try {
        throw new Error('Own error');
    } catch (err) {
        return new InternalErrorResponse(err).send(res);
    }
}));

export default router;


