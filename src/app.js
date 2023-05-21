import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"
import { signRoutes } from "./routes/sign.routes.js"
import { urlsRoutes } from "./routes/url.routes.js"


const app = express()
app.use(cors())
app.use(express.json())
app.use(signRoutes)
app.use(urlsRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))