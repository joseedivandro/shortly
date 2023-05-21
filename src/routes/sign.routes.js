import {Router} from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { signInSchema } from "../schemas/signIn.chema.js"
import { signUpSchema } from "../schemas/signUp.chema.js"
import { login, signUp } from "../connection/user.controller.js"
import token from "../middlewares/token.user.js"
import verifyEmail from "../middlewares/email.user.js"
import verifyToken from "../middlewares/token.repeat.user.js"


export const signRoutes = Router();


signRoutes.post("/signup", validateSchema(signUpSchema),verifyEmail ,signUp );
signRoutes.post("/signin", validateSchema(signInSchema),login, token, verifyToken);
