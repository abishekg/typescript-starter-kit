import express, {Request, Response, NextFunction} from 'express';
import {customExpressRequest} from '../@types/express';

const createContext = (req: customExpressRequest, res: Response, next: NextFunction) => {
  req.context = {
    sessionId: req.cookies['_apollo-web_session'],
    subject: 'server',
  };

  next();
};

export default createContext;
