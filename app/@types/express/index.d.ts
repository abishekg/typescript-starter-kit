import { Request } from "express";
import {setSession} from '../../middleware/session';

export interface customExpressRequest extends Request {
    context?: object,
    setSession: any
}
