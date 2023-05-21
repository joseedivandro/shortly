import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"
import { signRoutes } from "./routes/sign.routes.js"
import { urlRoutes } from "./routes/url.routes.js"
import { rankingRoutes } from "./routes/ranking.routes.js"
import { meUserRoutes } from "./routes/user.me.routes.js"


const app = express()
app.use(cors())
app.use(express.json())
app.use(signRoutes)
app.use(urlRoutes)
app.use(rankingRoutes)
app.use(meUserRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))