const pool = require('../config/db')
const insertData = require("./insertData");

function connectDB() {
    pool
        .connect()
        .then(() => console.log('[DATABASE] Connected'))
        .then(() => insertData())
        .catch((err) =>
            console.error('connection error', err.stack)
        )
}

module.exports = connectDB
