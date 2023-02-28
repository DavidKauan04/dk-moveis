import { Request, Response, NextFunction } from "express";

const verifyMiddleware = async ( req: Request, res: Response, next: NextFunction) => {
    if(req.body.hasOwnProperty("id") || req.body.hasOwnProperty("isAdm") || req.body.hasOwnProperty("isActive")){
        return res.status(401).json({
        message: 'It is forbidden to change the following fields: id, isAdm, isActive'
        })
    }

    return next()
};

export default verifyMiddleware;