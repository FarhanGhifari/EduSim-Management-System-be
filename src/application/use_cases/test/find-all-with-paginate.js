const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");
const resourcePagination = require("../../../frameworks/helpers/resource-pagination");

const validate = (params) => {
  const schema = Joi.object({
    search: Joi.string().empty("").optional(),
    module_id: Joi.number().integer().empty("").optional(),
    class_id: Joi.number().integer().empty("").optional(),
    schedule_type: Joi.string()
      .valid("pre_test", "post_test")
      .empty("")
      .optional(),
    status: Joi.string()
      .valid("Active", "Inactive", "Draft")
      .empty("")
      .optional(),
    sortType: Joi.string()
      .valid("ASC", "DESC", "asc", "desc")
      .default("ASC"),
    sort: Joi.string()
      .valid(
        "id",
        "title",
        "schedule_type",
        "date",
        "status",
        "module_id",
        "class_id"
      )
      .default("id"),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    isStudent: Joi.boolean().default(false),
    studentClassId: Joi.number().integer().allow(null).optional(),
  });

  const validator = schema.validate(params);

  if (validator.error) throw new AppError(validator.error.message, 400);

  return validator.value;
};

module.exports = async (repositories, params) => {
  const { scheduleRepository } = repositories;
  const query = validate(params);

  const { page, limit, isStudent } = query;
  const offset = (page - 1) * limit;

  if (isStudent) {
    if (!query.studentClassId) {
      return resourcePagination(page, limit, 0, []);
    }

    const { count: totalItems, rows: data } =
      await scheduleRepository.findActiveSchedulesForStudent({
        search: query.search,
        scheduleType: query.schedule_type,
        classId: query.studentClassId,
        sort: query.sortType,
        sortBy:
          query.sort === "module_id" || query.sort === "class_id"
            ? "date"
            : query.sort,
        offset,
        limit,
      });

    const formattedData = data.map((item) => ({
      id: item.id,
      title: item.title,
      schedule_type: item.schedule_type,
      date: item.date,
      duration_minutes: item.duration_minutes,
      max_question: item.max_question,
      status: item.status,
      module: item.module
        ? { id: item.module.id, title: item.module.title }
        : null,
      class: item.class ? { id: item.class.id, name: item.class.name } : null,
    }));

    return resourcePagination(page, limit, totalItems, formattedData);
  }

  const { count: totalItems, rows: data } = await scheduleRepository.index({
    search: query.search,
    moduleId: query.module_id,
    classId: query.class_id,
    scheduleType: query.schedule_type,
    status: query.status,
    sort: query.sortType,
    sortBy: query.sort,
    offset,
    limit,
  });

  const formattedData = data.map((item) => ({
    id: item.id,
    title: item.title,
    schedule_type: item.schedule_type,
    date: item.date,
    duration_minutes: item.duration_minutes,
    max_question: item.max_question,
    status: item.status,
    is_locked: item.is_locked,
    module: item.module
      ? { id: item.module.id, title: item.module.title }
      : null,
    class: item.class ? { id: item.class.id, name: item.class.name } : null,
  }));

  return resourcePagination(page, limit, totalItems, formattedData);
};
