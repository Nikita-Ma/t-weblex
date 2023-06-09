import {pool} from "../config/db"
import {getFormattedDate as getData} from './dateParser'


export async function insertData() {
    try {
        // connect to the database
        await pool.connect();

        // create fake data
        const p_date = getData()
        const p_author = 'example' + Math.round(Math.random() * 1000)

        // insert user in DB
        await pool.query('INSERT INTO user_data (u_name, u_password) VALUES ($1, $2)', [p_author, 'example']);

        // insert post in DB
        for (let i = 0; i <= 10; i++) {
            // create fake data
            const p_data = 'Data' + Math.round(Math.random() * 1000)

            await pool.query('INSERT INTO post_data (p_date, p_data, p_author, user_data_id) VALUES ($1, $2, $3, $4)', [p_date, p_data, p_author, p_author]);
        }

        console.log('[Data] Inserts.');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        console.log('[Data] FINALLY DATA')
    }
}
