const express = require('express')
const app = express()

// require middlewares
const {notFound, errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./utils/connectDB");

// require routes
const registerRoutes = require('./routes/registerRoutes')



// connect DB
connectDB()

app.use(express.json())

// routes

app.use('/user', registerRoutes)

// use custom middlewares
app.use(notFound)

app.use(errorHandler)

const PORT = process.env. PORT || 5000


app.listen(
    PORT,
    console.log(
        `[Server] Server running on ${PORT} PORT`
    )
)
