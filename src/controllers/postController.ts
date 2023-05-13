import fs from 'fs';
import path from 'path';
import {pool as db} from '../config/db'
import {Request, Response} from "express";
import {getPaginatedData} from "../utils/postPagination";
import {getFormattedDate as getData} from '../utils/dateParser'
import {JwtPayload} from "jsonwebtoken";


// * @desc Fetch create a new post
// * @route POST post/create
// * @access Private
export const createPost = async (req: Request, res: Response): Promise<void> => {

    const {dataPost, image} = req.body
    const user = req.user as JwtPayload
    const datePosts = getData()

    if (!image) {
        await db.query(
            'INSERT INTO post_data (p_date, p_data, p_author, user_data_id) VALUES ($1, $2, $3, $4)',
            [datePosts, dataPost, user.u_name, user.u_name]
        )

        res.json("successfully created")
        return Promise.resolve()
    }


    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const uniqueFilename = Date.now() + Math.floor(Math.random() * 10) + '.png';
    // Select directory to save images on the server
    const savePath = path.join(__dirname, '../uploads', uniqueFilename);
    await db.query(
        'INSERT INTO post_data (p_date, p_data, p_author, user_data_id) VALUES ($1, $2, $3, $4)',
        [datePosts, uniqueFilename, user.u_name, user.u_name]
    )

    // Save the image to the server
    fs.writeFile(savePath, imageBuffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).send('Error occurred while saving the image.');
            return Promise.resolve()
        }

        res.send('successfully created images');
        return Promise.resolve()
    });
}


// * @desc Fetch update
// * @route PUT post/update
// * @access Private
export const updatePost = async (req: Request, res: Response): Promise<void> => {

    const {dataPost, idPost, image} = req.body
    const user = req.user as JwtPayload
    const datePosts = getData()

    const allProductList = await db.query('SELECT * FROM post_data WHERE p_id=$1', [idPost])
    const dbPostAuthor = allProductList.rows[0].p_author

    if (dbPostAuthor !== user.u_name) {
        res.json(401)
        return Promise.resolve()
    }

    if (!image) {
        const updateSelectedPost = await db.query(
            'UPDATE post_data  SET p_data=$1, p_date = $3 WHERE p_id = $2',
            [dataPost, idPost, datePosts]
        )
        res.json("successfully updated")
        return Promise.resolve()
        if (!updateSelectedPost.rowCount) {
            res.sendStatus(404)
            return Promise.resolve()
        }
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const uniqueFilename = Date.now() + Math.floor(Math.random() * 10) + '.png';
    // Select directory to save images on the server
    const savePath = path.join(__dirname, '../uploads', uniqueFilename);
    await db.query(
        'UPDATE post_data  SET p_data=$1, p_date = $3 WHERE p_id = $2',
        [uniqueFilename, idPost, datePosts]
    )

    // Save the image to the server
    fs.writeFile(savePath, imageBuffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).send('Error occurred while saving the image.');
        }

        res.send('successfully update images');
        return Promise.resolve()
    });


    res.json("successfully updated")
    return Promise.resolve()
}


// * @desc Fetch delete
// * @route DELETE post/delete
// * @access Private
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    const {idPost} = req.body
    const user = req.user as JwtPayload
    const allProductList = await db.query('SELECT * FROM post_data WHERE p_id=$1', [idPost])
    const dbPostAuthor = allProductList.rows[0].p_author

    if (dbPostAuthor !== user.u_name) {
        res.json(401)
        return Promise.resolve()
    }

    const deletePost = await db.query(
        'DELETE FROM post_data WHERE p_id=$1',
        [idPost]
    )
    if (!deletePost.rowCount) {
        res.sendStatus(404)
        return Promise.resolve()
    }


    res.json("successfully delete")
    return Promise.resolve()
}


// * @desc Fetch give post data
// * @route GET post/pagination?page=number
// * @access Private
export const getPostPag = async (req: Request, res: Response): Promise<void> => {

    const {page} = req.query
    const changeTypePage = Number(page)

    const resultPag = await getPaginatedData(changeTypePage, 19)
        .then(data => {
            return data
        })
        .catch(error => {
            console.error('Error retrieving data:', error);
            return 'Some error!'
        });

    res.send(resultPag)
    return Promise.resolve()
}




