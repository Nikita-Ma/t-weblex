import express, {Request, Response, Express} from "express";

const app: Express = express()

// require middlewares
import {notFound, errorHandler} from "./middleware/errorMiddleware";
import {connectDB} from "./utils/connectDB";

// require routes
import registerRoutes from './routes/authRoutes'
import postRoutes from './routes/postRoutes'
import imageRouter from './routes/imageRoutes'


// connect DB
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}));

// routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hi there!')
})
app.use('/user', registerRoutes)
app.use('/post', postRoutes)
app.use('/images', imageRouter)

// use custom middlewares
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`[SERVER] listen PORT ${PORT}`)
})
