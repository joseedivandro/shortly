
import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().invalid("").required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
});
