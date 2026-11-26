const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

const validateId = (id) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
  });

  const validator = schema.validate({ id });
  if (validator.error) throw new AppError(validator.error.message, 400);
};

const validate = (payload) => {
  const schema = Joi.object({
    module_id: Joi.number().integer().optional(),
    class_id: Joi.number().integer().optional(),
    title: Joi.string().trim().max(255).optional(),
    schedule_type: Joi.string().valid("pre_test", "post_test").optional(),
    date: Joi.date().optional(),
    duration_minutes: Joi.number().integer().min(1).optional(),
    max_question: Joi.number().integer().min(1).optional(),
    status: Joi.string().valid("Active", "Inactive", "Draft").optional(),
    is_locked: Joi.boolean().optional(),
  }).min(1);

  const validator = schema.validate(payload);

  if (validator.error) throw new AppError(validator.error.message, 400);

  return validator.value;
};

module.exports = async (repositories, id, payload) => {
  const { scheduleRepository } = repositories;

  validateId(id);
  const data = validate(payload);

  const existingSchedule = await scheduleRepository.show(id);
  if (!existingSchedule) {
    throw new AppError("Test schedule not found", 404);
  }

  const currentModuleId = existingSchedule.module
    ? existingSchedule.module.id
    : null;
  const currentClassId = existingSchedule.class
    ? existingSchedule.class.id
    : null;

  const moduleId = data.module_id || currentModuleId;
  const scheduleType = data.schedule_type || existingSchedule.schedule_type;

  if (data.class_id && data.class_id !== currentClassId) {
    const hasAttempts = await scheduleRepository.hasTestAttempts(id);
    if (hasAttempts) {
      throw new AppError(
        "Class cannot be changed because the test already has attempts",
        409
      );
    }

    const classExists = await scheduleRepository.findClassById(data.class_id);
    if (!classExists) {
      throw new AppError("Class not found", 404);
    }
  }

  if (data.module_id) {
    const moduleExists = await scheduleRepository.findModuleById(
      data.module_id
    );
    if (!moduleExists) {
      throw new AppError("Module not found", 404);
    }
  }

  if (data.max_question || data.module_id || data.schedule_type) {
    const maxQuestion = data.max_question || existingSchedule.max_question;
    const activeQuestionsCount = await scheduleRepository.countActiveQuestions(
      moduleId,
      scheduleType
    );

    if (maxQuestion > activeQuestionsCount) {
      throw new AppError(
        "Requested question count exceeds the available question bank",
        422
      );
    }
  }

  return scheduleRepository.update(id, data);
};
