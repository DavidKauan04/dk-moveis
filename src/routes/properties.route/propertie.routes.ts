import { Router } from "express"
import { createPropertieController, listPropertieController } from "../../controllers/properties.controller/properties.controller"
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware"
import verifyAuthAndActiveMiddleware from "../../middlewares/verifyIsAdmin.middleware"


const propertieRouter = Router()

const propertiesRoute = () => {
    propertieRouter.post('', ensureAuthMiddleware, verifyAuthAndActiveMiddleware, createPropertieController )
    propertieRouter.get('',  listPropertieController)

    return propertieRouter
}

export default propertiesRoute;