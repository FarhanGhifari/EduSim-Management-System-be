const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

const validateId = (id) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
  });

  const validator = schema.validate({ id });
  if (validator.error) throw new AppError(validator.error.message, 400);
};

module.exports = async (
  repositories,
  id,
  isStudent = false,
  studentClassId = null
) => {
  const { scheduleRepository } = repositories;

  validateId(id);

  if (isStudent) {
    if (!studentClassId) {
      throw new AppError("Test schedule not found", 404);
    }

    const schedule = await scheduleRepository.showActiveScheduleForStudent(
      id,
      studentClassId
    );

    if (!schedule) {
      throw new AppError("Test schedule not found", 404);
    }

    return {
      data: {
        id: schedule.id,
        title: schedule.title,
        schedule_type: schedule.schedule_type,
        date: schedule.date,
        duration_minutes: schedule.duration_minutes,
        max_question: schedule.max_question,
        status: schedule.status,
        module: schedule.module
          ? { id: schedule.module.id, title: schedule.module.title }
          : null,
        class: schedule.class
          ? { id: schedule.class.id, name: schedule.class.name }
          : null,
      },
    };
  }

  const schedule = await scheduleRepository.show(id);

  if (!schedule) {
    throw new AppError("Test schedule not found", 404);
  }

  const availableQuestion = await scheduleRepository.countActiveQuestions(
    schedule.module ? schedule.module.id : null,
    schedule.schedule_type
  );

  return {
    data: {
      id: schedule.id,
      title: schedule.title,
      schedule_type: schedule.schedule_type,
      date: schedule.date,
      duration_minutes: schedule.duration_minutes,
      max_question: schedule.max_question,
      status: schedule.status,
      is_locked: schedule.is_locked,
      available_question: availableQuestion,
      module: schedule.module
        ? { id: schedule.module.id, title: schedule.module.title }
        : null,
      class: schedule.class
        ? { id: schedule.class.id, name: schedule.class.name }
        : null,
    },
  };
};
