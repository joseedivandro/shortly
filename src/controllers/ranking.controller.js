import { db } from "../dataBase/connection.js";

export async function getRanking(req, res) {
    const urlLimit = 10

    try {
        const response = await db.query(
            `
            SELECT 
                users.id,
                users.name,
                COALESCE(COUNT(urls.id), 0) AS "linksCount",
                COALESCE(SUM(urls.visit_count), 0) AS "visitCount"
            FROM users
            LEFT JOIN urls ON users.id = urls.user_id 
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT $1;          
            `,
            [urlLimit]
        )

        return res.send(response.rows)

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}