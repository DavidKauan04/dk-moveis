import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entities";
import { Schedules } from "../../entities/schedules.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";


const createSchedulesService = async ({ userId, propertyId, date, hour }: IScheduleRequest): Promise<void> => {
    const schedulesRepository = AppDataSource.getRepository(Schedules)
    const userRepository = AppDataSource.getRepository(User)
    const propertiesRepository = AppDataSource.getRepository(Properties)

    const user = await userRepository.findOneBy({
        id: userId
    })

    const property = await propertiesRepository.findOneBy({
        id: propertyId
    })

    if(!property){
        throw new AppError(404, "Invalid propertyId")
    }

    const hourSplit = hour.split("")
    let hourUse
    if(hourSplit.length === 4){
        hourUse = hour.slice(0, 1)
    } else {
        hourUse = hour.slice(0, 2)
    }
    
    if(+hourUse < 8 || +hourUse >= 18){
        throw new AppError(400, "Invalid hour")
    } 

    const userDate = new Date(date)
    const validDate = userDate.getDay()
    if(validDate === 6 || validDate === 0){
        throw new AppError(400, "Invalid date")
    }
    
    if(!user || !property){
        throw new AppError(404, 'User or properties not found')
    }
    
    const scheduleAlreadyExist = await schedulesRepository.findOneBy({
        hour,
        date
    })

    if(scheduleAlreadyExist){
        throw new AppError(400, "Schedule already exists")
    }

    await schedulesRepository.save({
        user,
        property,
        date, 
        hour
    })

}

export default createSchedulesService;