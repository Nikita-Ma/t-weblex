
const pool = require('../config/db')
function connectDB() {
  pool
    .connect()
    .then(() => console.log('[DATABASE] Connected'))
    .catch((err) =>
      console.error('connection error', err.stack)
    )
}
module.exports = connectDB
