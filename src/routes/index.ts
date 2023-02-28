import { Express } from "express";
import categoriesRoute from "./categories.route/categorie.routes";
import propertiesRoute from "./properties.route/propertie.routes";
import schedulessRoute from "./schedules.route/schedules.routes";
import sessionRoute from "./session.route/login.routes";
import usersRoute from "./user.route/users.routes";


const kiMoveisRoutes = (app: Express) => {
    app.use('/users', usersRoute())
    app.use('/login', sessionRoute())
    app.use('/categories', categoriesRoute())
    app.use('/properties', propertiesRoute())
    app.use('/schedules', schedulessRoute())
}

export default kiMoveisRoutes;