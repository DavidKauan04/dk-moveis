import { Router } from "express"
import { createCategoriesController, listCategoriesController, listCategoriesIdController } from "../../controllers/categories.controller/categoriesGeral.controller"
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware"
import verifyAuthAndActiveMiddleware from "../../middlewares/verifyIsAdmin.middleware"


const categorieRouter = Router()

const categoriesRoute = () => {
    categorieRouter.post('', ensureAuthMiddleware, verifyAuthAndActiveMiddleware, createCategoriesController)
    categorieRouter.get('', listCategoriesController )
    categorieRouter.get('/:id/properties', listCategoriesIdController )

    return categorieRouter
}

export default categoriesRoute;