const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");
const resourcePagination = require("../../../frameworks/helpers/resource-pagination");

const validate = (params) => {
  const schema = Joi.object({
    search: Joi.string().empty("").optional(),
    sortType: Joi.string()
      .valid("ASC", "DESC", "asc", "desc")
      .default("ASC"),
    sort: Joi.string()
      .valid("id", "name", "created_at", "updated_at")
      .default("id"),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  });

  const validator = schema.validate(params);

  if (validator.error) throw new AppError(validator.error.message, 400);

  return validator.value;
};

module.exports = async (repositories, params) => {
  const { classRepository } = repositories;
  const query = validate(params);

  const { page, limit } = query;
  const offset = (page - 1) * limit;

  const { count: total, rows: data } = await classRepository.index({
    search: query.search,
    sort: query.sortType,
    sortBy: query.sort,
    offset,
    limit,
  });

  return resourcePagination(page, limit, total, data);
};
