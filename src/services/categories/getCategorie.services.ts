import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entities";


const getCategorieServices = async (): Promise<Category[]> => {
    const categorieRepository = AppDataSource.getRepository(Category)

    const listCategories = await categorieRepository.find()
    
    return listCategories;
}

export default getCategorieServices;