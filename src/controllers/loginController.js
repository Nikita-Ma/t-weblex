const config = require('../../customSecretKey')
const db = require('../config/db')
const jwt = require('jsonwebtoken')

const getLogin = async (req, res) => {

    const {u_name, u_password} = req.body

    const findPerson = await db.query('SELECT * FROM user_data')

    // verify person
    const checkId = findPerson.rows.find((userObject) => {
        if (userObject.u_name === u_name && userObject.u_password === u_password) {
            return true
        } else {
            return false
        }
    })
    if (!checkId) {
        return res.status(401).send('Not Unauthorized')
    }

    // generate and send new token
    const token = jwt.sign(
        {u_name, u_password},
        config.jwt.TOKEN_KEY,
        {
            expiresIn: '1d',
        }
    )
    return res.json({token})
}

module.exports = getLogin
