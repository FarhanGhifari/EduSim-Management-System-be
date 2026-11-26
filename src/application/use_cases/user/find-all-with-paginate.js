const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");
const resourcePagination = require("../../../frameworks/helpers/resource-pagination");

const validate = (params) => {
    const schema = Joi.object({
        sortType: Joi.string().valid("ASC", "DESC", "asc", "desc"),
        sort: Joi
        .string()
        .valid("name", "username", "studentStatus", "createdAt", "updatedAt"),
        page: Joi.number(),
        limit: Joi.number().max(10000),
    })

    const validator = schema.validate(params)

    if(validator.error) throw new AppError(validator.error.message, 400)
}

module.exports = async (repositories, params) => {
    const { userRepository } =  repositories

    validate(params)

    const { page, limit } = params
    
    const offset = (page - 1) * limit

    const {count: total, rows: data} = await userRepository.index(params);
    
    return resourcePagination(page, limit, total, data)
}