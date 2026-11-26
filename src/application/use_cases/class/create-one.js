const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

const validate = (payload) => {
  const schema = Joi.object({
    name: Joi.string().trim().max(255).required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
      "string.max": "Name must be at most 255 characters",
    }),
  });

  const validator = schema.validate(payload);

  if (validator.error) throw new AppError(validator.error.message, 400);

  return validator.value;
};

module.exports = async (repositories, payload) => {
  const { classRepository } = repositories;

  const data = validate(payload);

  return classRepository.create(data);
};
