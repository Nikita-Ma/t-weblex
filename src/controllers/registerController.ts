import {Response} from "express";

import jwt from 'jsonwebtoken'
import {pool as db} from '../config/db'
import {customSecretKey as customEnv} from '../../customSecretKey'


// * @desc Fetch create a new user
// * @route POST /user/register
// * @access Public

export const registerUser = async (req: any, res: Response): Promise<void> => {

    try {
        const {u_name, u_password} = req.body
        if (!(u_name && u_password)) {
            res.status(400).send('Request all input')
            return Promise.resolve()
        }

        const checkUser = await db.query(
            'SELECT * FROM user_data WHERE u_name = $1',
            [u_name]
        )

        if (checkUser.rows.length) {
            res.send('User Already Exist. Please Login') // ! Not good from a security point of view
            return Promise.resolve()
        }

        await db.query(
            'INSERT INTO user_data (u_name, u_password) VALUES ($1, $2)',
            [u_name, u_password]
        )

        const token = jwt.sign({u_name, u_password}, customEnv.jwt.TOKEN_KEY, {
            expiresIn: '1d',
        })

        res.set('Authorization', `Bearer ${token}`)
        res.status(201).json(token)
        return Promise.resolve()
    } catch (e) {
        console.error(`Error ${e}`)
        process.exit(1)
    }
}
