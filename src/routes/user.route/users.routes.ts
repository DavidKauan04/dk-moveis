import { Router } from "express"
import { CreateUserController, deleteUserController, listUsersController, updatedUserController } from "../../controllers/users.controller/userGeral.controller"
import verifyMiddleware from "../../middlewares/ensure.middleware"
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware"
import ensureIsAdmPatchMiddleware from "../../middlewares/updated.middleware"
import verifyAuthAndActiveMiddleware from "../../middlewares/verifyIsAdmin.middleware"


const userRouter = Router()

const usersRoute = () => {
    userRouter.post('', CreateUserController)
    userRouter.get('', ensureAuthMiddleware, verifyAuthAndActiveMiddleware, listUsersController)
    userRouter.patch('/:id', ensureAuthMiddleware, verifyMiddleware, ensureIsAdmPatchMiddleware, updatedUserController)
    userRouter.delete('/:id', ensureAuthMiddleware, verifyAuthAndActiveMiddleware, deleteUserController)

    return userRouter
}

export default usersRoute;