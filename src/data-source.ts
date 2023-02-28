import { DataSource } from "typeorm"
import "dotenv/config"
import { User } from "./entities/users.entities"
import { Schedules } from "./entities/schedules.entities"
import { Properties } from "./entities/properties.entities"
import { Category } from "./entities/categories.entities" 
import { Address } from "./entities/addresses.entities"


const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test" ?
    {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"]
    } :
    {
        type: "postgres",
        host: process.env.HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: false,
        synchronize: false,
        entities: [User, Schedules, Properties, Category, Address],
        migrations: ['src/migrations/*.ts']
    }
)

export default AppDataSource