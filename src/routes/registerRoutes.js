const express = require('express')
const router = express.Router()

// require controllers
const register = require('../controllers/registerController')


router.route('/').post(register)

module.exports = router
