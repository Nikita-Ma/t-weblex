import express, {Router} from 'express'
import {getImages} from '../controllers/imagesController'

const router: Router = express.Router()

router.route('/').get(getImages)

export default router