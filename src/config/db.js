const config = require('../../customSecretKey')

const Pool = require('pg').Pool


const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
    ssl: true
})
module.exports = pool
