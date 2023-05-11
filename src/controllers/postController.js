const db = require('../config/db')
const customEnv = require('../../customSecretKey.js')
const getPaginatedData = require("../utils/postPagination");


// * @desc Fetch create a new post
// * @route POST post/create
// * @access Private
const createPost = async (req, res) => {
    const {datePosts, dataPost} = req.body
    const addNewProduct = await db.query(
        'INSERT INTO post_data (p_date, p_data, p_author, user_data_id) VALUES ($1, $2, $3, $4)',
        [datePosts, dataPost, req.user.u_name, req.user.u_name]
    )

    return res.json("successfully created")
}




// * @desc Fetch update
// * @route PUT post/update
// * @access Private
const updatePost = async (req, res) => {
    const {datePosts, dataPost, idPost} = req.body

    const allProductList = await db.query('SELECT * FROM post_data WHERE p_id=$1', [idPost])
    const dbPostAuthor = allProductList.rows[0].p_author

    if (dbPostAuthor !== req.user.u_name) {
        return res.json(401)
    }

    const updateSelectedPost = await db.query(
        'UPDATE post_data  SET p_data=$1, p_date = $3 WHERE p_id = $2',
        [dataPost, idPost, datePosts]
    )

    if (!updateSelectedPost.rowCount) {
        return res.sendStatus(404)
    }


    return res.json("successfully updated")
}




// * @desc Fetch delete
// * @route DELETE post/delete
// * @access Private
const deletePost = async (req, res) => {
    const {idPost} = req.body

    const allProductList = await db.query('SELECT * FROM post_data WHERE p_id=$1', [idPost])
    const dbPostAuthor = allProductList.rows[0].p_author

    if (dbPostAuthor !== req.user.u_name) {
        return res.json(401)
    }

    const deletePost = await db.query(
        'DELETE FROM post_data WHERE p_id=$1',
        [idPost]
    )
    if (!deletePost.rowCount) {
        return res.sendStatus(404)
    }


    return res.json("successfully delete")
}



// * @desc Fetch give post data
// * @route GET post/pagination?page=()
// * @access Private
const getPostPag = async (req, res) => {

    const {page} = req.query


    const resultPag = await getPaginatedData((page-1)*20, page*20)
        .then(data => {
            return data
        })
        .catch(error => {
            console.error('Error retrieving data:', error);
        });

    return res.send(resultPag)
}


module.exports = {
    createPost,
    getPostPag,
    updatePost,
    deletePost
}


