import { Router } from "express"
import { createSchedulesController, listSchedulesController } from "../../controllers/schedules.controller/schedulesGeral.controller"
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware"
import verifyAuthAndActiveMiddleware from "../../middlewares/verifyIsAdmin.middleware"


const schedulesRouter = Router()

const schedulessRoute = () => {
    schedulesRouter.post('', ensureAuthMiddleware, createSchedulesController)
    schedulesRouter.get('/properties/:id', ensureAuthMiddleware, verifyAuthAndActiveMiddleware, listSchedulesController)

    return schedulesRouter
}

export default schedulessRoute;