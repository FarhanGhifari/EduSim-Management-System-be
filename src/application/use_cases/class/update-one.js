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
    name: Joi.string().trim().max(255).optional().messages({
      "string.empty": "Name cannot be empty",
      "string.max": "Name must be at most 255 characters",
    }),
  }).min(1);

  const validator = schema.validate(payload);

  if (validator.error) throw new AppError(validator.error.message, 400);

  return validator.value;
};

module.exports = async (repositories, id, payload) => {
  const { classRepository } = repositories;

  validateId(id);
  const data = validate(payload);

  const existingClass = await classRepository.findById(id);
  if (!existingClass) {
    throw new AppError("Class not found", 404);
  }

  return classRepository.update(id, data);
};
