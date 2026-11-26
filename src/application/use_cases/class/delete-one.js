const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

const validateId = (id) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
  });

  const validator = schema.validate({ id });
  if (validator.error) throw new AppError(validator.error.message, 400);
};

module.exports = async (repositories, id) => {
  const { classRepository } = repositories;

  validateId(id);

  const existingClass = await classRepository.findById(id);
  if (!existingClass) {
    throw new AppError("Class not found", 404);
  }

  const scheduleCount = await classRepository.countSchedules(id);
  if (scheduleCount > 0) {
    throw new AppError("Class is still used by one or more tests", 409);
  }

  await classRepository.destroy(id);

  return { message: "success" };
};
