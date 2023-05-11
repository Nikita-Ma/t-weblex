const fs = require('fs');
const path = require('path');
const db = require('../config/db')
const getPaginatedData = require("../utils/postPagination");
const getData = require('../utils/dateParser')


// * @desc Fetch create a new post
// * @route POST post/create
// * @access Private
const createPost = async (req, res) => {

    const {dataPost, image} = req.body
    const datePosts = getData()

    if (!image) {
        await db.query(
            'INSERT INTO post_data (p_date, p_data, p_author, user_data_id) VALUES ($1, $2, $3, $4)',
            [datePosts, dataPost, req.user.u_name, req.user.u_name]
        )

        return res.json("successfully created")
    }


    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const uniqueFilename = Date.now() + Math.floor(Math.random() * 10) + '.png';
    // Select directory to save images on the server
    const savePath = path.join(__dirname, '../uploads', uniqueFilename);
    await db.query(
        'INSERT INTO post_data (p_date, p_data, p_author, user_data_id) VALUES ($1, $2, $3, $4)',
        [datePosts, uniqueFilename, req.user.u_name, req.user.u_name]
    )

    // Save the image to the server
    fs.writeFile(savePath, imageBuffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).send('Error occurred while saving the image.');
        }

        res.send('successfully created images');
    });
}


// * @desc Fetch update
// * @route PUT post/update
// * @access Private
const updatePost = async (req, res) => {

    const {dataPost, idPost} = req.body
    const datePosts = getData()

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
// * @route GET post/pagination?page=number
// * @access Private
const getPostPag = async (req, res) => {

    const {page} = req.query

    const resultPag = await getPaginatedData(page, 20)
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


