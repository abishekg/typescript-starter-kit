import redis from '../api/redis';
import config from "../config";
import {Response, NextFunction} from 'express';
import {customExpressRequest} from "../@types/express";

export const handleSession = (req: customExpressRequest, res: Response, next: NextFunction) => {
    const sessionId = req.cookies['_apollo-web_session'] || 'value-present';
    if (!sessionId) {
        const err = new Error('sessionId not in cookie');
        return handleNoSession(req, res, next, err);
    }
    req.setSession = setSession(req);
    Promise.all([redis.getSession(req)]).then(([appSession]) => {
        return next();
    }).catch(error => {
        return handleNoSession(req, res, next, error);
    })
}

export const handleNoSession = (req: customExpressRequest, res: Response, next: NextFunction, error: object) => {
    const params = encodeURIComponent(req.url);
    return res.redirect(config.redirectURL + params);
};

export const setSession = (req: customExpressRequest) => {
    return (key: string, value: any) => {
        return redis.setSession(req, key, value);
    };
};
