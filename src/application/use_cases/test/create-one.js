const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

const validate = (payload) => {
  const schema = Joi.object({
    module_id: Joi.number().integer().required(),
    class_id: Joi.number().integer().required(),
    title: Joi.string().trim().max(255).required(),
    schedule_type: Joi.string().valid("pre_test", "post_test").required(),
    date: Joi.date().min("now").required(),
    duration_minutes: Joi.number().integer().min(1).required(),
    max_question: Joi.number().integer().min(1).required(),
    status: Joi.string().valid("Active", "Inactive", "Draft").default("Active"),
    is_locked: Joi.boolean().default(false),
  });

  const validator = schema.validate(payload);

  if (validator.error) throw new AppError(validator.error.message, 400);

  return validator.value;
};

module.exports = async (repositories, payload) => {
  const { scheduleRepository } = repositories;

  const data = validate(payload);

  const moduleExists = await scheduleRepository.findModuleById(data.module_id);
  if (!moduleExists) {
    throw new AppError("Module not found", 404);
  }

  const classExists = await scheduleRepository.findClassById(data.class_id);
  if (!classExists) {
    throw new AppError("Class not found", 404);
  }

  const activeQuestionsCount = await scheduleRepository.countActiveQuestions(
    data.module_id,
    data.schedule_type
  );

  if (data.max_question > activeQuestionsCount) {
    throw new AppError(
      "Requested question count exceeds the available question bank",
      422
    );
  }

  const schedule = await scheduleRepository.create(data);

  return scheduleRepository.show(schedule.id);
};
