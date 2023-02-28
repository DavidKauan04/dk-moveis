import AppDataSource from "../../data-source"; 
import { User } from "../../entities/users.entities"; 
import { IUserLogin } from "../../interfaces/users";
import {compare} from 'bcrypt' 
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { AppError } from "../../errors/appError";


const loginSessionService = async ({email, password}:IUserLogin):Promise<string> => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        email: email
    })

    if (!user) {
        throw new AppError(403, 'Invalid email or password!')
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
        throw new AppError(403, 'Invalid email or password!')
    }

    const token = jwt.sign({
        isAdm: user.isAdm,
        isActive: user.isActive
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: '24h',
        subject: user.id
    })

    return token
}


export default loginSessionService;