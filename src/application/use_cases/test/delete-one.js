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
  const { scheduleRepository } = repositories;

  validateId(id);

  await scheduleRepository.transaction(async (transaction) => {
    const schedule = await scheduleRepository.show(id, { transaction });
    if (!schedule) {
      throw new AppError("Test schedule not found", 404);
    }

    const hasAttempts = await scheduleRepository.hasTestAttempts(id, {
      transaction,
    });
    if (hasAttempts) {
      throw new AppError(
        "Test schedule cannot be deleted because it already has student test attempts attached",
        409
      );
    }

    await scheduleRepository.destroy(id, { transaction });
  });

  return { message: "success" };
};
