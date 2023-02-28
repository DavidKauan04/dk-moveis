import { Request, Response, NextFunction } from 'express'
import 'dotenv/config'

const verifyAuthAndActiveMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.user.isActive) {
        return res.status(400).json({message: 'User is inactive and does not have permission.'})
    }

    if (req.method === 'PATCH') {
        if (req.user.id === req.params.id) {
            return next()
        }
        return res.status(401).json({message: 'user'})
    }

    
    if (!req.user.isAdm) {
        return res.status(403).json({
            message: "User is not admin"
        })
    }

    return next()
}

export default verifyAuthAndActiveMiddleware;