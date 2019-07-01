//重写： express.RequestHandler

import { Request, Response, NextFunction }  from 'express';

export interface CustomerRequest extends Request {
    user?: string
}

export interface CustomerResponse extends Response {

}

export type CustomerRequestHandler = (req: CustomerRequest, res: CustomerResponse, 
    next: NextFunction ) => any;
    