import express from 'express'
const routes = express.Router()

import {verifyToken as verifyAuth} from '../middleware/authMiddleware'

import {
    createPost,
    getPostPag, updatePost, deletePost
} from '../controllers/postController'

routes.route('/create').post(verifyAuth, createPost)
routes.route('/update').put(verifyAuth, updatePost)
routes.route('/delete').delete(verifyAuth, deletePost)
routes.route('/pagination').get(verifyAuth, getPostPag)

export default routes
