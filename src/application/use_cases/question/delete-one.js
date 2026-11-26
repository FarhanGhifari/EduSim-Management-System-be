const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

const validate = (params) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
  });

  const validator = schema.validate(params);

  if (validator.error) throw new AppError(validator.error.message, 400);
};

module.exports = async (repositories, id) => {
  const { questionRepository } = repositories;

  validate({ id });

  const result = await questionRepository.show(id);

  if (!result) throw new AppError("Soal tidak ditemukan", 404);

  await questionRepository.destroy(id);

  return;
};
