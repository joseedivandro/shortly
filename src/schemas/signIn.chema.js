import joi from "joi"

export const signInSchema = joi.object({
    email: joi.string().email().invalid("").required(),
    password: joi.string().invalid("").required(),
})