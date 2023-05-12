const express = require('express')
const app = express()
const serverless = require('serverless-http');
const router = express.Router();

// require middlewares
const {notFound, errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./utils/connectDB");

// require routes
const registerRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const imageRouter = require('./routes/imageRoutes')


// connect DB
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}));

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);
// routes
app.get('/', (req, res) => {
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

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);