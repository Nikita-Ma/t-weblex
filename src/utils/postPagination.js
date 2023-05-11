const db = require('../config/db')

async function getPaginatedData(pageNumber, pageSize) {

    const offset = (pageNumber - 1) * pageSize;

    const query = `
    SELECT * FROM post_data
    ORDER BY p_id
    OFFSET $1
    LIMIT $2
  `;

    const values = [offset, pageSize];

    try {
        const result = await db.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

module.exports = getPaginatedData