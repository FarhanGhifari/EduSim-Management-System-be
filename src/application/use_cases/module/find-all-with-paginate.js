const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");
const resourcePagination = require("../../../frameworks/helpers/resource-pagination");

const validate = (params) => {
  const schema = Joi.object({
    search: Joi.string().empty("").optional(),
    parentId: Joi.number().integer().min(1).empty("").optional(),
    type: Joi.string().empty("").optional(),
    sortType: Joi.string().valid("ASC", "DESC", "asc", "desc").default("ASC"),
    sort: Joi
      .string()
      .valid("id", "title", "type", "parent_id", "created_at", "updated_at")
      .default("id"),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(10000).default(10),
    userRole: Joi.string().optional(),
  });

  const validator = schema.validate(params);

  if (validator.error) throw new AppError(validator.error.message, 400);

  return validator.value;
};

module.exports = async (repositories, params) => {
  const { moduleRepository } = repositories;
  const query = validate(params);

  const { page, limit } = query;
  const offset = (page - 1) * limit;

  const include = [
    {
      association: "children",
      attributes: ["id"],
    },
  ];

  const { count: total, rows: data } = await moduleRepository.index({
    search: query.search,
    parentId: query.parentId,
    type: query.type,
    sort: query.sortType,
    sortBy: query.sort,
    offset,
    limit,
    include,
  });

  let formattedData = data;

  if (query.userRole === "Siswa") {
    formattedData = data.map((item) => {
      const json = item.toJSON ? item.toJSON() : item;
      return {
        id: json.id,
        title: json.title,
        parent_id: json.parent_id,
        type: json.type,
      };
    });
  } else {
    formattedData = data.map((item) => {
      const json = item.toJSON ? item.toJSON() : item;
      const childrenCount =
        json.children && json.children.length > 0
          ? json.children.length
          : typeof json.count === "number"
            ? json.count
            : 0;

      const { children, ...rest } = json;
      return {
        ...rest,
        count: childrenCount,
      };
    });
  }

  return resourcePagination(page, limit, total, formattedData);
};
