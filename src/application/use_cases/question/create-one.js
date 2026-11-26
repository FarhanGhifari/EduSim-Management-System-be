const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

const validate = (payload) => {
  const schema = Joi.object({
    module_id: Joi.number().integer().min(1).required(),
    question: Joi.string().required(),
    form_type: Joi.string().valid("pre_test", "post_test").required(),
    status: Joi.boolean().default(true),
    author: Joi.string().default("Developer"),
    options: Joi.array()
      .items(
        Joi.object({
          answer: Joi.string().required(),
          is_correct: Joi.boolean().required(),
        })
      )
      .min(2)
      .max(4)
      .required(),
  });

  const validator = schema.validate(payload);

  if (validator.error) throw new AppError(validator.error.message, 400);

  return validator.value;
};

const validateCorrectAnswer = (options) => {
  const correctCount = options.filter((opt) => opt.is_correct === true).length;

  if (correctCount === 0) {
    throw new AppError(
      "Tidak ada kunci jawaban yang dipilih. Harus ada tepat 1 jawaban benar.",
      422
    );
  }

  if (correctCount > 1) {
    throw new AppError(
      "Terdapat lebih dari satu jawaban benar. Harus ada tepat 1 jawaban benar.",
      422
    );
  }
};

module.exports = async (repositories, payload) => {
  const { questionRepository } = repositories;

  const data = validate(payload);

  // Validate correct answer count
  validateCorrectAnswer(data.options);

  // Validate module_id exists
  const moduleExists = await questionRepository.findModuleById(data.module_id);
  if (!moduleExists) {
    throw new AppError("Module tidak ditemukan", 404);
  }

  const { options, ...questionPayload } = data;

  return questionRepository.transaction(async (t) => {
    // Create question
    const question = await questionRepository.create(questionPayload, {
      transaction: t,
    });

    // Create options
    const optionsWithQuestionId = options.map((opt) => ({
      ...opt,
      question_id: question.id,
    }));

    await questionRepository.bulkCreateOptions(optionsWithQuestionId, {
      transaction: t,
    });

    // Return with options
    return questionRepository.show(question.id, { transaction: t });
  });
};
