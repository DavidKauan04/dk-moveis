import AppDataSource from "../../data-source";
import { IPropertyRequest } from "../../interfaces/properties";
import { AppError } from "../../errors/appError";
import { Properties } from "../../entities/properties.entities";
import { Address } from "../../entities/addresses.entities";
import { Category } from "../../entities/categories.entities";

const createPropertiesService = async ({value, size, address, categoryId}: IPropertyRequest): Promise<Properties> => {
    const propertyRepository = AppDataSource.getRepository(Properties);
    const addressRepository = AppDataSource.getRepository(Address);
    const categoryRepository = AppDataSource.getRepository(Category);

    const findCategory = await categoryRepository.findOneBy({
        id: categoryId,
    });

    if (!findCategory) {
        throw new AppError(404, "Cannot find category");
    }

    const addressAlreadyRegistered = await addressRepository.findOneBy({
        district: address.district,
        number: address.number,
        city: address.city
    });

    if(addressAlreadyRegistered) {
        throw new AppError(400, "Address already registered");
    }

    try {
        var createAddress = addressRepository.create(address);
        await addressRepository.save(createAddress);
    } catch (error) {
        throw new AppError(400, "Invalid zip code")
    }

    const property = propertyRepository.create({
        value,
        size,
        address: createAddress,
        category: findCategory,
    });

    const saveProperty = await propertyRepository.save(property);

    return saveProperty;
};

export default createPropertiesService;