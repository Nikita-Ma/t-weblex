const jwt = require('jsonwebtoken')
const customEnv = require('../../customSecretKey.js')


const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['authorization']
  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, customEnv.jwt.TOKEN_KEY)
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

module.exports = verifyToken
