import {Router} from "express"

import { createShortenUrl, getUrl, redirectUrl, deleteUrl} from "../connection/url.controller.js"

import { validateToken } from "../middlewares/validate.token.js"

import { validateSchema } from "../middlewares/validateSchema.middleware.js"

import { shortenUrlSchema } from "../schemas/shortUrl.schema.js"



export const urlsRoutes = Router()

urlsRoutes.get ("/urls/:id", getUrl)

urlsRoutes.get('/urls/open/:shortUrl', redirectUrl)

urlsRoutes.post("/urls/shorten", validateToken, validateSchema(shortenUrlSchema), createShortenUrl)

urlsRoutes.delete('/urls/:id', validateToken, deleteUrl)