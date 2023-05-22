import { db } from "../dataBase/connection.js"
import bcrypt from "bcrypt"

export async function signUp(req, res) {
    const { name, email, password } = req.body

    try {
        await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, bcrypt.hashSync(password, 10)],
            res.sendStatus(201)
        )

    } catch (err) {
        console.log("Erro no signUp:", err);
        return res.sendStatus(500)
    }
    return res.sendStatus(201)
}

export async function login(req, res, next) {
    const { email, password } = req.body

    try {
        const response = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        if (response.rowCount === 0) return res.sendStatus(401)

        const { id, password: passwordInDb } = response.rows[0]

        req.body.userId = id

        if (!bcrypt.compareSync(password, passwordInDb)) return res.sendStatus(401)

        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}
