import { Router } from "express";


import { meUserGet } from "../controllers/user.me.controller.js";

import { validateToken } from "../middlewares/validate.token.js";


export const meUserRoutes = Router();   

meUserRoutes.get("/users/me", validateToken, meUserGet);