import { db } from "../dataBase/connection.js";
import shortUrl from "./shortUrl.js";


export async function createShortenUrl(req, res) {

    const { url } = req.body

    const userId = req.userId

    const shortenedUrl = shortUrl()

    let requestId

    try {
        const response = await db.query(
            'INSERT INTO urls (user_id, url, short_url) VALUES ($1, $2, $3)',
            [userId, url, shortenedUrl]
        )

        if (response.rowCount === 1) {
            const { rows } = await db.query('SELECT max(id) as "insertedId" FROM urls')
            requestId = rows[0].insertedId
        }

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    return res.status(201).send({
        id: requestId,
        shortUrl: shortenedUrl
    })
}


export async function getUrl(req, res) {

    const { id } = { ...req.params }

    try {
        const response = await db.query(
            `
            SELECT 
                id, 
                short_url as "shortUrl", 
                url FROM urls 
            WHERE 
                id = $1
            `,
            [id]
        )

        if (response.rowCount === 0) return res.sendStatus(404)

        return res.send(response.rows[0])

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}


export async function redirectUrl(req, res) {

    const { shortUrl } = { ...req.params }

    try {
        const { rowCount, rows } = await db.query(
            'SELECT url, visit_count as "visitCount" FROM urls WHERE short_url = $1',
            [shortUrl]
        )

        if (rowCount === 0) return res.sendStatus(404)

        await db.query(
            "UPDATE urls SET visit_count = $1 WHERE short_url = $2",
            [rows[0].visitCount + 1, shortUrl]
        )

        return res.redirect(rows[0].url)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function deleteUrl(req, res) {

    const { id } = { ...req.params }

    const idUserSolicited = req.userId

    try {

        const { rows } = await db.query(
            'SELECT user_id as "userId" FROM urls WHERE id = $1',
            [id]
        )

        const userIdDb = rows[0]?.userId

        if(!userIdDb) return res.sendStatus(404)

        if (idUserSolicited !== userIdDb) return res.sendStatus(401)

        const { rowCount } = await db.query(
            "DELETE FROM urls WHERE id = $1",
            [id]
        )
        if (rowCount === 0) return res.sendStatus(404)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }    

    return res.sendStatus(204)
}