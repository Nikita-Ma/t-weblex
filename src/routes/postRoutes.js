const express = require('express')
const routes = express.Router()

const verifyAuth = require('../middleware/authMiddleware')
const {
    createPost,
    getPostPag, updatePost, deletePost
} = require('../controllers/postController')

routes.route('/create').post(verifyAuth, createPost)
routes.route('/update').put(verifyAuth, updatePost)
routes.route('/delete').delete(verifyAuth, deletePost)
routes.route('/pagination').get(verifyAuth, getPostPag)

module.exports = routes

