const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");
const {
  fileRepository,
  getTypeFromExtension,
  checkParentId,
} = require("../../../frameworks/helpers/module-helpers");

const validate = (payload) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    parent_id: Joi.number().integer().min(1).allow(null).optional(),
    module_id: Joi.number().integer().min(1).allow(null).optional(),
    submodule_id: Joi.number().integer().min(1).allow(null).optional(),
    type: Joi.string().valid("module", "sub_module", "content").required(),
    meta: Joi.alternatives().try(Joi.object(), Joi.array(), Joi.string()).allow(null, "").optional(),
    count: Joi.number().integer().min(0).allow(null).optional(),
    learningMaterials: Joi.array().items(
      Joi.object({
        id: Joi.number().integer().min(1).optional(),
        title: Joi.string().allow(null, "").optional(),
        description: Joi.string().allow(null, "").optional(),
        assets: Joi.array().items(
          Joi.object({
            id: Joi.number().integer().min(1).optional(),
            title: Joi.string().allow(null, "").optional(),
            path: Joi.string().allow(null, "").optional(),
            type: Joi.string().allow(null, "").optional(),
            order_index: Joi.number().integer().min(0).allow(null).optional(),
            filename: Joi.string().allow(null, "").optional(),
            originalname: Joi.string().allow(null, "").optional(),
            mimetype: Joi.string().allow(null, "").optional(),
            size: Joi.number().allow(null, "").optional(),
            url: Joi.string().allow(null, "").optional(),
          })
        ).optional(),
      })
    ).optional(),
  });

  const validator = schema.validate(payload);

  if (validator.error) throw new AppError(validator.error.message, 400);
};

module.exports = async (repositories, payload) => {
  const { moduleRepository } = repositories;

  validate(payload);

  const { module_id, submodule_id, ...restPayload } = payload;

  let parentId = restPayload.parent_id;

  if (payload.type === "content") {
    parentId = submodule_id !== undefined ? submodule_id : parentId;
  } else if (payload.type === "sub_module") {
    parentId = module_id !== undefined ? module_id : parentId;
  }

  if (module_id) {
    await checkParentId(moduleRepository, module_id);
  }
  if (submodule_id) {
    await checkParentId(moduleRepository, submodule_id);
  }
  if (parentId && !module_id && !submodule_id) {
    await checkParentId(moduleRepository, parentId);
  }

  const movedFiles = [];

  try {
    if (restPayload.learningMaterials && restPayload.learningMaterials.length > 0) {
      for (const material of restPayload.learningMaterials) {
        if (material.assets && material.assets.length > 0) {
          for (const asset of material.assets) {
            let assetTitle = asset.path || asset.title;

            if (assetTitle && assetTitle.startsWith("temp/")) {
              const permanentPath = assetTitle.replace(/^temp\//, "");
              await fileRepository.move(assetTitle, permanentPath);
              movedFiles.push({ from: assetTitle, to: permanentPath });
              assetTitle = permanentPath;
            }

            asset.title = assetTitle;
            delete asset.path;
            delete asset.filename;
            delete asset.originalname;
            delete asset.mimetype;
            delete asset.size;
            delete asset.url;

            if (!asset.type && asset.title) {
              asset.type = getTypeFromExtension(asset.title);
            }
          }
        }
      }
    }

    const result = await moduleRepository.create({
      ...restPayload,
      parent_id: parentId,
    });

    return result;
  } catch (error) {
    for (const moved of movedFiles) {
      try {
        await fileRepository.delete(moved.to);
      } catch (err) {
        console.error(`[ROLLBACK] Failed to delete file ${moved.to}:`, err);
      }
    }
    throw error;
  }
};

