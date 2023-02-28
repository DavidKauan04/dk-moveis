import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entities";
import { AppError } from "../../errors/appError";


const listCategorieidServices = async (id: string): Promise<Category> => {
    const categorieRepository = AppDataSource.getRepository(Category)

    const listCategories = await categorieRepository.findOneBy({
        id
    })

    if (!listCategories) {
        throw new AppError(404, 'Categories Not Found!')
    }
    
    return listCategories;
}

export default listCategorieidServices;