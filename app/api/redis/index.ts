import redis from './redis-client';
import config from '../../config';
import {customExpressRequest} from '../../@types/express';

const defaultSession = {
    appSession: {},
};

const getSession = (req: customExpressRequest) => {
    return new Promise((resolve) => {
        const key = `${config.appRedisSessionKey}:${req.cookies['_apollo-web_session']}`;

        const promise = redis.pipeline().expire(key, config.redisKeyExpiry).get(key).exec();

        promise.then((result) => {
            const response = {
                appSession: result[1][1] ? JSON.parse(result[1][1]) : {}
            }

            resolve(response);
        }).catch(err => {
            console.log(`failed to fetch session for key ${key}`);
            resolve(defaultSession);
        })
    })
}

const setSession = (req: customExpressRequest, key: string, value: string) => {
    return new Promise((resolve) => {
        const sessionKey = req.cookies[`_apollo-web_session`];
        const sessionId = `${config.appRedisSessionKey}:${sessionKey}`;

        getSession(req).then((session: any) => {
            const appSession = session.appSession;
            appSession[key] = value;

            redis.set(sessionId, JSON.stringify(appSession), 'EX', config.redisKeyExpiry)
                .then(result => {
                    console.log(`${key} - ${JSON.stringify(value)} set successfully in session`);
                    resolve({});
                })
                .catch(err => {
                    resolve(defaultSession);
                })
        })
    })
}

const resetSession = (req: customExpressRequest) => {
    return new Promise((resolve, reject) => {
        const sessionKey = req.cookies['_apollo-web_session'];
        const sessionID = `${config.appRedisSessionKey}:${sessionKey}`;

        getSession(req).then((session: any) => {
            const appSession = {_csrf: ''};
            session.appSession;
            appSession._csrf = session.appSession._csrf;

            redis
                .set(sessionID, JSON.stringify(appSession), 'EX', config.redisKeyExpiry)
                .then((result) => {
                    console.log('App session reset successful');
                    resolve('');
                })
                .catch((err) => {
                    console.log('App session reset failed');
                    resolve(defaultSession);
                });
        });
    });
};

export default {getSession, setSession, resetSession};
