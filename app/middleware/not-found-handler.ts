import {Response, NextFunction} from 'express';
import {customExpressRequest} from '../@types/express';
import { NotFoundResponse } from '../utils/api-response';

const notFoundHandler = (req: customExpressRequest, res: Response, next: NextFunction) => {
  return new NotFoundResponse().send(res);
};

export default notFoundHandler;