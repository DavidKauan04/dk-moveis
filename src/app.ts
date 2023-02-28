import "reflect-metadata"
import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import { AppError } from "./errors/appError"
import kiMoveisRoutes from "./routes"


const app = express()
app.use(express.json())

kiMoveisRoutes(app)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'Error',
            message: err.message
        })
    }

    console.log(err)
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error!'
    })
})


export default app