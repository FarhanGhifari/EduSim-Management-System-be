const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");
const { fileRepository } = require("../../../frameworks/helpers/module-helpers");

const validate = (params) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
  });

  const validator = schema.validate(params);

  if (validator.error) throw new AppError(validator.error.message, 400);
};

module.exports = async (repositories, id) => {
  const { moduleRepository } = repositories;

  validate({ id });

  const result = await moduleRepository.show(id);

  if (!result) throw new AppError("Module not found", 404);

  const cascadeResult = await moduleRepository.destroyWithCascade(id);

  if (cascadeResult && cascadeResult.filesToDelete && cascadeResult.filesToDelete.length > 0) {
    for (const filePath of cascadeResult.filesToDelete) {
      try {
        await fileRepository.delete(filePath);
      } catch (err) {
        console.error(`[WARNING] Failed to delete file from storage: ${filePath}`, err);
      }
    }
  }

  return;
};
