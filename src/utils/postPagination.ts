import {pool} from "../config/db"

export async function getPaginatedData(pageNumber:number, pageSize:number) {

    const offset = (pageNumber - 1) * pageSize;

    const query = `
    SELECT * FROM post_data
    ORDER BY p_id
    OFFSET $1
    LIMIT $2
  `;

    const values = [offset, pageSize];

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

