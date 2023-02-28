import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createPropertieService from "../../services/properties/createPropertie.services";
import listPropertiesService from "../../services/properties/listProperties.services";


export const createPropertieController = async (req: Request, res: Response) => {
    try {
        const newPropertie = req.body
        
        const properties = await createPropertieService(newPropertie)
        
        return res.status(201).json({...properties, message: 'created Property'})
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}

export const listPropertieController = async (req: Request, res: Response) => {
    try {
        const propertiesList = await listPropertiesService()

        return res.status(200).json(propertiesList)
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}