const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");
const resourcePagination = require("../../../frameworks/helpers/resource-pagination");

const validate = (params) => {
  const schema = Joi.object({
    search: Joi.string().empty("").optional(),
    module_id: Joi.number().integer().min(1).empty("").optional(),
    form_type: Joi.string()
      .valid("pre_test", "post_test", "pre-test", "post-test", "Pre-test", "Post-test")
      .empty("")
      .optional(),
    sortType: Joi.string()
      .valid("ASC", "DESC", "asc", "desc")
      .default("ASC"),
    sort: Joi.string()
      .valid("id", "question", "form_type", "status", "module_id")
      .default("id"),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(10000).default(10),
  });

  const validator = schema.validate(params);

  if (validator.error) throw new AppError(validator.error.message, 400);

  return validator.value;
};

module.exports = async (repositories, params) => {
  const { questionRepository } = repositories;
  const query = validate(params);

  const { page, limit } = query;
  const offset = (page - 1) * limit;

  const normalizedFormType = query.form_type
    ? query.form_type.replace("-", "_").toLowerCase()
    : undefined;

  const { count: totalItems, rows: data } = await questionRepository.index({
    search: query.search,
    moduleId: query.module_id,
    formType: normalizedFormType,
    sort: query.sortType,
    sortBy: query.sort,
    offset,
    limit,
  });

  const mappedData = data.map((item) => ({
    id: item.id,
    question: item.question,
    module: item.module ? item.module.title : null,
    form_type: item.form_type,
    status: item.status,
    author: item.author || "Developer",
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  return resourcePagination(page, limit, totalItems, mappedData);
};
