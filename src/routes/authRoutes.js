const express = require('express')
const router = express.Router()

// require controllers
const register = require('../controllers/registerController')
const login = require('../controllers/loginController')


router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router
