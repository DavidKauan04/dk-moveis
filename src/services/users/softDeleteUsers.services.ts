import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entities"
import { AppError } from "../../errors/appError"


const deleteUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOneBy({id})

    if(!findUser){
        throw new AppError(404, "User not found")
    }

    if(!findUser.isActive){
        throw new AppError(400, "User active is already false")
    }

    await userRepository.update(
        id,
        {
            isActive: false
        }
    )

    const user = await userRepository.findOneBy({id})

    return user!

}

export default deleteUserService;