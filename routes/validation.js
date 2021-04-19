const Joi = require("@hapi/joi");

const newUserSchema = Joi.object({
    name: Joi.string().min(1).max(200).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(2).required(),
})

module.exports = {
    newUserSchema,
}