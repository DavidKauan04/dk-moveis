import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entities";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";


const createCategorieService = async ({name}: ICategoryRequest): Promise<Category> => {
    const categorieRepository = AppDataSource.getRepository(Category)
    
    const findCategory = await categorieRepository.findOneBy({
        name: name
    })
    
    if(findCategory){
        throw new AppError(400, "Category already exists")
    }

    const newCategorie = await categorieRepository.create({
        name
    })

    await categorieRepository.save(newCategorie)

    return newCategorie
}

export default createCategorieService;