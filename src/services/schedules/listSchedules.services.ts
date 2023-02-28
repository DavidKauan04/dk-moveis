import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entities";
import { AppError } from "../../errors/appError";


const listSchedulesidServices = async (propertyId: string): Promise<Properties> => {
    const propertieRepository = AppDataSource.getRepository(Properties)

    const findPropertie = await propertieRepository.findOne({
        where: {
            id: propertyId
        }, 
        relations: {
            category: true,
            schedules: true
        }
    })

    if (!findPropertie) {
        throw new AppError(404, 'Scheduless Not Found!')
    }

    return findPropertie;
}

export default listSchedulesidServices;