const jwt = require('jsonwebtoken')
const db = require('../config/db')
const customEnv = require('../../customSecretKey.js')


// * @desc Fetch create a new user
// * @route POST /user
// * @access Public

const registerUser = async (req, res) => {

  try {
    const { u_name, u_password} = req.body
    if (!(u_name && u_password)) {
      res.status(400).send('Request all input')
    }

    const checkUser = await db.query(
      'SELECT * FROM user_data WHERE u_name = $1',
      [u_name]
    )

    if (checkUser.rows.length) {
      return res.send('User Already Exist. Please Login') // ! Not good from a security point of view
    }

    const createUser = await db.query(
      'INSERT INTO user_data (u_name, u_password) VALUES ($1, $2)',
      [u_name, u_password]
    )

    const token = jwt.sign({ user_id: u_name,  u_password }, customEnv.jwt.TOKEN_KEY , {
      expiresIn: '1h',
    })

    res.set('Authorization', `Bearer ${token}`)
    res.status(201).json(token)
  } catch (e) {
    console.error(`Error ${e}`)
    process.exit(1)
  }
}
module.exports = registerUser
