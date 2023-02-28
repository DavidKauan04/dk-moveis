import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entities";


const listUserServices = async ():Promise<User[]> => {
    const userRepository = AppDataSource.getRepository(User)

    const listUser = await userRepository.find()

    return listUser
}

export default listUserServices;