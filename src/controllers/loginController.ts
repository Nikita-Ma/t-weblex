import {customSecretKey as config} from '../../customSecretKey'
import {pool as db} from '../config/db'
import jwt from 'jsonwebtoken';
import {Response} from "express";


// * @desc Fetch login user
// * @route POST /user/login
// * @access Public
export const getLogin = async (req: any, res: Response): Promise<void> => {

    const {u_name, u_password}  = req.body

    const findPerson = await db.query('SELECT * FROM user_data')

    // verify person
    const checkId = findPerson.rows.find((userObject: { u_name: string; u_password: string }) => {
        if (userObject.u_name === u_name && userObject.u_password === u_password) {
            return true
        } else {
            return false
        }
    })
    if (!checkId) {
        res.status(401).send('Not Unauthorized')
        return Promise.resolve()
    }

    // generate and send new token
    const token = jwt.sign(
        {u_name, u_password},
        config.jwt.TOKEN_KEY,
        {
            expiresIn: '1d',
        }
    )
     res.json({token})
    return Promise.resolve()
}

