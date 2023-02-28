import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import { instanceToPlain } from 'class-transformer'
import createUserService from "../../services/users/createUser.services"
import listUserServices from "../../services/users/listUser.Services"
import { IUserUpdate } from "../../interfaces/users"
import updateUserServices from "../../services/users/updated.services"
import deleteUserService from "../../services/users/softDeleteUsers.services"



export const CreateUserController = async (req: Request, res: Response) => {
    try {
        const newUser = req.body
        const userCreate = await createUserService(newUser)
        return res.status(201).json(instanceToPlain(userCreate))
    } catch (err) {
        if (err instanceof AppError){
            handleError(err, res)
        }
    }  
}

export const listUsersController = async (req: Request, res: Response) => {
    try {
        const users = await listUserServices()
        return res.status(200).json(instanceToPlain(users))
    } catch (err) {
        if (err instanceof AppError){
            handleError(err, res)
        }
    } 
}   

export const updatedUserController = async (req: Request, res: Response) => {
    try {
        const id: string = req.user.id
        const user: IUserUpdate = req.body
        const updatedUser = await updateUserServices(user, id)

        return res.status(200).json({
            message: "user updated",
            userUpdated: instanceToPlain(updatedUser)
        })
    } catch (err) {
        if (err instanceof AppError){
            handleError(err, res)
        }
    } 
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const userDelet = await deleteUserService(id)
        return res.status(204).json(userDelet)
    } catch (err) {
        if (err instanceof AppError){
            handleError(err, res)
        }
    } 
}