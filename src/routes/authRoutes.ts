import express, {Router} from 'express'

const router: Router = express.Router()

// require controllers
import {registerUser as register} from '../controllers/registerController'
import {getLogin as login} from '../controllers/loginController'


router.route('/register').post(register)
router.route('/login').post(login)

export default router