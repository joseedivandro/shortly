import { Router} from "express";

import { getRanking } from "../connection/ranking.controller.js";

export const rankingRoutes = Router()

rankingRoutes.get("/ranking", getRanking)