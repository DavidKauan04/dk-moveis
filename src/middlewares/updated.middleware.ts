import { Request, Response, NextFunction } from "express";

const ensureIsAdmPatchMiddleware = async ( req: Request, res: Response, next: NextFunction) => {
    if(!req.user.isAdm){
        return res.status(401).json({
            message: 'User is not admin'
        })
    }

    if (req.method === 'PATCH') {
        if (req.user.id === req.params.id) {
            return next()
        }
        return res.status(404).json({message: 'user'})
    }

    return next()
};

export default ensureIsAdmPatchMiddleware;