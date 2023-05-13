import {customSecretKey as config} from '../../customSecretKey'

import { Pool } from 'pg';


export const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
    ssl: true
})

