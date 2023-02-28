import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import createCategorieService from "../../services/categories/createCategories.services"
import getCategorieServices from "../../services/categories/getCategorie.services"
import listCategorieidServices from "../../services/categories/listCategorieAndPropeties.services"


export const createCategoriesController = async (req: Request, res: Response) => {
    try {
        const categorie = req.body
        const newCategorie = await createCategorieService(categorie)
        return res.status(201).json(newCategorie)
    } catch (err) {
        if(err instanceof AppError){
            handleError(err, res)
        }
    }
}

export const listCategoriesController = async (req: Request, res: Response) => {
    try {
        const listCategorie = await getCategorieServices()
        return res.status(200).json(listCategorie)
    } catch (err) {
        if(err instanceof AppError){
            handleError(err, res)
        }
    }
}

export const listCategoriesIdController = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const listCategorie = await listCategorieidServices(id)
        return res.status(200).json(listCategorie)
    } catch (err) {
        if(err instanceof AppError){
            handleError(err, res)
        }
    }
}
