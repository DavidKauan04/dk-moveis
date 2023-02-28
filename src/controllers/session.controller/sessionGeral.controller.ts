import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { IUserLogin } from "../../interfaces/users"
import loginSessionService from "../../services/sessions/login.services"


export const loginSessionController = async (req: Request, res: Response) => {
    try {
        const data: IUserLogin = req.body
        const token = await loginSessionService(data)
        return res.status(200).json({token})
    } catch (err) {
        if (err instanceof AppError){
            handleError(err, res)
        }
    }
}