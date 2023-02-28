import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entities";


const listPropertiesService = async ():Promise<Properties[]> => {
    const propertieRepository = AppDataSource.getRepository(Properties)

    const properties = await propertieRepository.find()

    return properties
}

export default listPropertiesService;