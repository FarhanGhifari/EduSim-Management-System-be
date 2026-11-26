const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");
const resourcePagination = require("../../../frameworks/helpers/resource-pagination");

const validate = (params) => {
    const schema = Joi.object({
        id: Joi.number().integer().required()
    })

    const validator = schema.validate(params)

    if(validator.error) throw new AppError(validator.error.message, 400)
}

module.exports = async (repositories, id) => {
    const { userRepository } =  repositories

    validate({id})

    const result = await userRepository.show(id);

    if(!result) throw new AppError("User not found", 404)

    await userRepository.destroy(id);

    return
}