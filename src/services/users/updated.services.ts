
import { hash } from 'bcrypt'
import AppDataSource from '../../data-source'
import { User } from '../../entities/users.entities'
import { AppError } from '../../errors/appError'
import { IUserUpdate } from '../../interfaces/users'

const updateUserServices = async ({name, email, password}:IUserUpdate, id: string): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOneBy({
        id
    })

    if (!findUser) {
        throw new AppError(404, 'User not found!')
    }

    await userRepository.update(
        id,
        {
            name: name ? name : findUser.name,
            email: email ? email : findUser.email,
            password: password ? await hash(password, 10) : findUser.password
        }
    )

    const user = await userRepository.findOneBy({
        id
    })

    return user!
}

export default updateUserServices;