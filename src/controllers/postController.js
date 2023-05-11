const db = require('../config/db')
const customEnv = require('../../customSecretKey.js')
const getPaginatedData = require("../utils/postPagination");


// * @desc Fetch create a new user
// * @route POST post/create
// * @access Private
const createPost = async (req, res) => {
    const {datePosts, dataPost, authorPost} = req.body

    const addNewProduct = await db.query(
        'INSERT INTO post_data (p_date, p_data, p_author, user_data_id) VALUES ($1, $2, $3, $4)',
        [datePosts, dataPost, authorPost, authorPost]
    )

    return res.json("successfully created")
}

// * @desc Fetch create a new user
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
    getPostPag
}


