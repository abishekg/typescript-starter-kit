import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import {port, appRoute} from './config';
import routes from './routes';
import path from 'path';


const app = express();

app.use(helmet());

app.use(appRoute, routes);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

app
.listen(port, () => console.info(`server running on port : http://localhost:${port}/starter/sales-desk`))
.on('error', (e) => console.error(e));

app.use('/static', express.static(path.join(__dirname, 'public')))