import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import createContext from './middleware/create-context';
import notFoundHandler from './middleware/not-found-handler';
import config from './config';
import routes from './routes';
import {handleSession} from './middleware/session';
import path from 'path';
import {customExpressRequest} from "./@types/express";

const app = express();

app.use(helmet());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

app.use(cookieParser());

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'pact') {
  app.use((req, res, next) => {
    req.cookies['_apollo-web_session'] = 'local_session_id';
    return next();
  });
}

app.use(createContext);

app.use(handleSession);

app.use('/', async (req: customExpressRequest, res, next) => {
  await req.setSession('c', 'chair');
  next();
})

app.use(config.appRoute, routes);

if (!config.skipLogging) {
  //Will have to add logger middleware
  //app.use(requestLogger);
}

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(notFoundHandler);


export default app;
