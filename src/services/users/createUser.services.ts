import AppDataSource from "../../data-source"; 
import { User } from "../../entities/users.entities"; 
import { IUserRequest } from "../../interfaces/users"; 
import { hash } from 'bcrypt'
import { AppError } from "../../errors/appError";

const createUserService = async ({name, email, password, isAdm}:IUserRequest): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User)

    const hashPassword = await hash(password, 10)
    
    const findUser = await userRepository.find()

    const emailAlreadyExists = findUser.find((findUser) => findUser.email === email)

    if(emailAlreadyExists){
        throw new AppError(400, "Email already exists")
    }

    const user = userRepository.create({
        name,
        email,
        password: hashPassword,
        isAdm
    })

    await userRepository.save(user)

    return user
}

export default createUserService;