import joi from "joi"

const regexUrlPattern = /^https?:\/\/.*/

export const shortenUrlSchema = joi.object({
    url: joi.string().regex(regexUrlPattern).required()
})