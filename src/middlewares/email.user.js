import { db } from "../dataBase/connection.js";

export default async function verifyEmail(req, res, next){
  

    const { email } = req.body

    try {
        const { rowCount } = await db.query("SELECT * FROM users WHERE email = $1", [email])

        if(rowCount !== 0) return res.sendStatus(409)
        
    } catch (err) {
        console.log("Erro ao verificar o e-mail:", err);
        return res.sendStatus(500)
    }
    next()
}