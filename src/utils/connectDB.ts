import {pool} from "../config/db"
import {insertData} from "./insertData";

export function connectDB(): void {
    pool
        .connect()
        .then(() => console.log('[DATABASE] Connected'))
        .then(() => insertData())
        .catch((err: Error) =>
            console.error('connection error', err.stack)
        )
}

