import path from 'path'
import {Request, Response} from "express";

// * @desc Fetch image
// * @route GET images/id=number
// * @access Public
export const getImages = (req: Request, res: Response): Promise<void> => {
    const imagePath = path.join(__dirname, '../uploads', `${req.query.id}`) // Replace with the actual path to your image
    res.sendFile(imagePath)
    return Promise.resolve()
}

