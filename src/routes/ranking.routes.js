import { Router} from "express";

import { getRanking } from "../controllers/ranking.controller.js";

export const rankingRoutes = Router()

rankingRoutes.get("/ranking", getRanking)