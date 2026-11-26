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

  const foundClass = await classRepository.show(id);
  if (!foundClass) {
    throw new AppError("Class not found", 404);
  }

  return {
    data: foundClass,
  };
};
