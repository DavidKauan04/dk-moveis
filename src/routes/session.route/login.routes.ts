import { Router } from "express";
import { loginSessionController } from "../../controllers/session.controller/sessionGeral.controller";


const loginRouter = Router()

const sessionRoute = () => {
    loginRouter.post('', loginSessionController)

    return loginRouter
}

export default sessionRoute;