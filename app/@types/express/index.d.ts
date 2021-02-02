import { Request } from "express";

export interface customExpressRequest extends Request {
    context?: object;
}
