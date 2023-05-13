import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express';
import {customSecretKey as customEnv} from '../../customSecretKey'


declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token: string | undefined =
        req.body.token || req.query.token || req.headers['authorization']

    if (!token) {
        res.status(403).send('A token is required for authentication')
        return Promise.resolve()
    }

    try {
        const decoded: string | JwtPayload = jwt.verify(token, customEnv.jwt.TOKEN_KEY)
        req.user = decoded
    } catch (err) {
        res.status(401).send('Invalid Token')
        return Promise.resolve()
    }
    next()
    return Promise.resolve()
}