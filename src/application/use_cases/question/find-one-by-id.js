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

  return {
    id: result.id,
    question: result.question,
    module_id: result.module_id,
    module: result.module ? result.module.title : null,
    form_type: result.form_type,
    status: result.status,
    author: result.author || "Developer",
    created_at: result.created_at,
    updated_at: result.updated_at,
    options: result.options
      ? result.options.map((opt) => ({
          id: opt.id,
          answer: opt.answer,
          is_correct: opt.is_correct === true || opt.is_correct === "true",
        }))
      : [],
  };
};
