const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

const validate = (payload) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    module_id: Joi.number().integer().min(1).optional(),
    question: Joi.string().optional(),
    form_type: Joi.string().valid("pre_test", "post_test").optional(),
    status: Joi.boolean().optional(),
    author: Joi.string().optional(),
    options: Joi.array()
      .items(
        Joi.object({
          answer: Joi.string().required(),
          is_correct: Joi.boolean().required(),
        })
      )
      .min(2)
      .max(4)
      .optional(),
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

module.exports = async (repositories, id, payload) => {
  const { questionRepository } = repositories;

  const data = validate({ id, ...payload });

  // Validate question exists
  const existingQuestion = await questionRepository.show(id);
  if (!existingQuestion) {
    throw new AppError("Soal tidak ditemukan", 404);
  }

  // Validate module_id exists if provided
  if (data.module_id) {
    const moduleExists = await questionRepository.findModuleById(data.module_id);
    if (!moduleExists) {
      throw new AppError("Module tidak ditemukan", 404);
    }
  }

  // Validate correct answer count if options provided
  if (data.options) {
    validateCorrectAnswer(data.options);
  }

  const { options, id: questionId, ...questionPayload } = data;

  return questionRepository.transaction(async (t) => {
    // Update question fields if any payload provided
    if (Object.keys(questionPayload).length > 0) {
      await questionRepository.update(id, questionPayload, { transaction: t });
    }

    // Update options if options provided
    if (options) {
      // Delete old options, then create new ones (replace strategy)
      await questionRepository.destroyOptions(id, { transaction: t });

      const optionsWithQuestionId = options.map((opt) => ({
        ...opt,
        question_id: id,
      }));

      await questionRepository.bulkCreateOptions(optionsWithQuestionId, {
        transaction: t,
      });
    }

    // Return updated data
    return questionRepository.show(id, { transaction: t });
  });
};
