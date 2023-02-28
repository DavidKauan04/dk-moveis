import { Request, Response } from 'express'
import { AppError, handleError } from '../../errors/appError'
import createSchedulesService from '../../services/schedules/createSchedules.services'
import listSchedulesidServices from '../../services/schedules/listSchedules.services'


export const createSchedulesController = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const dataScheduly = req.body
        await createSchedulesService({...dataScheduly, userId})
        return res.status(201).json({message: 'schedules create'})
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}

export const listSchedulesController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const schedules = await listSchedulesidServices(id)

        return res.status(200).json({schedules})
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}

