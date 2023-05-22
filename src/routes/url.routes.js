import {Router} from "express"

import { createShortUrl, getUrl, redirectUrl, deleteUrl} from "../controllers/url.controller.js"

import { validateToken } from "../middlewares/validate.token.js"

import { validateSchema } from "../middlewares/validateSchema.middleware.js"

import { shortenUrlSchema } from "../schemas/shortUrl.schema.js"


export const urlRoutes = Router()

urlRoutes.get ("/urls/:id", getUrl)

urlRoutes.get('/urls/open/:shortUrl', redirectUrl)

urlRoutes.post("/urls/shorten", validateToken, validateSchema(shortenUrlSchema), createShortUrl)

urlRoutes.delete('/urls/:id', validateToken, deleteUrl)