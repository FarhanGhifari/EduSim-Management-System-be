const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");
const {
  fileRepository,
  getTypeFromExtension,
  checkParentId,
} = require("../../../frameworks/helpers/module-helpers");

const validate = (payload) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    title: Joi.string().optional(),
    parent_id: Joi.number().integer().min(1).allow(null).optional(),
    module_id: Joi.number().integer().min(1).allow(null).optional(),
    submodule_id: Joi.number().integer().min(1).allow(null).optional(),
    type: Joi.string().valid("module", "sub_module", "content").optional(),
    meta: Joi.alternatives()
      .try(Joi.object(), Joi.array(), Joi.string())
      .allow(null, "")
      .optional(),
    count: Joi.number().integer().min(0).allow(null).optional(),
    learningMaterials: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().integer().min(1).allow(null).optional(),
          title: Joi.string().allow(null, "").optional(),
          description: Joi.string().allow(null, "").optional(),
          assets: Joi.array()
            .items(
              Joi.object({
                id: Joi.number().integer().min(1).allow(null).optional(),
                title: Joi.string().allow(null, "").optional(),
                path: Joi.string().allow(null, "").optional(),
                type: Joi.string().allow(null, "").optional(),
                order_index: Joi.number().integer().min(0).allow(null).optional(),
                filename: Joi.string().allow(null, "").optional(),
                originalname: Joi.string().allow(null, "").optional(),
                mimetype: Joi.string().allow(null, "").optional(),
                size: Joi.number().allow(null, "").optional(),
                url: Joi.string().allow(null, "").optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional(),
  });

  const validator = schema.validate(payload);

  if (validator.error) throw new AppError(validator.error.message, 400);
};

module.exports = async (repositories, id, payload) => {
  const { moduleRepository } = repositories;

  validate({ id, ...payload });

  await checkModuleId(moduleRepository, id);

  const {
    learningMaterials,
    module_id,
    submodule_id,
    ...modulePayload
  } = payload;

  let parentId = modulePayload.parent_id;
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

  if (parentId !== undefined) {
    modulePayload.parent_id = parentId;
  }

  const movedFiles = [];
  const oldFilesToDelete = [];

  let result;

  try {
    result = await moduleRepository.transaction(async (t) => {
      if (Object.keys(modulePayload).length > 0) {
        await moduleRepository.update(id, modulePayload, { transaction: t });
      }

      if (learningMaterials !== undefined && Array.isArray(learningMaterials)) {
        const existingModule = await moduleRepository.show(
          id,
          [
            {
              association: "learningMaterials",
              include: [{ association: "assets" }],
            },
          ],
          { transaction: t },
        );

        const currentMaterials =
          (existingModule && existingModule.learningMaterials) || [];

        const incomingMaterialIds = learningMaterials
          .filter((m) => m.id)
          .map((m) => Number(m.id));

        const deletedMaterials = currentMaterials.filter(
          (cm) => !incomingMaterialIds.includes(cm.id),
        );

        for (const deletedMaterial of deletedMaterials) {
          if (deletedMaterial.assets && deletedMaterial.assets.length > 0) {
            for (const asset of deletedMaterial.assets) {
              const filePath = asset.path || asset.title;
              if (filePath && !filePath.startsWith("http://") && !filePath.startsWith("https://")) {
                oldFilesToDelete.push(filePath);
              }
            }
          }
          await moduleRepository.deleteLearningMaterialWithLinks(deletedMaterial.id, {
            transaction: t,
          });
        }

        for (const material of learningMaterials) {
          await syncLearningMaterial(
            moduleRepository,
            id,
            material,
            currentMaterials,
            { movedFiles, oldFilesToDelete, t },
          );
        }
      }

      return moduleRepository.show(
        id,
        [
          {
            association: "learningMaterials",
            include: [{ association: "assets" }],
          },
        ],
        { transaction: t },
      );
    });
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

  for (const oldPath of oldFilesToDelete) {
    try {
      await fileRepository.delete(oldPath);
    } catch (err) {
      console.error(
        `[WARNING] Failed to delete old file from storage: ${oldPath}`,
        err,
      );
    }
  }

  return result;
};

const checkModuleId = async (repository, id) => {
  const moduleData = await repository.show(id);

  if (!moduleData) throw new AppError("Module not found", 404);
};

const syncLearningMaterial = async (
  moduleRepository,
  moduleId,
  materialPayload,
  currentMaterials,
  { movedFiles, oldFilesToDelete, t },
) => {
  const { id: matIdInput, assets, ...materialData } = materialPayload;

  const existingMaterial = matIdInput
    ? currentMaterials.find((m) => m.id === Number(matIdInput))
    : null;

  let targetMaterialId = existingMaterial ? existingMaterial.id : null;

  if (existingMaterial) {
    if (Object.keys(materialData).length > 0) {
      await moduleRepository.updateLearningMaterial(
        moduleId,
        existingMaterial.id,
        materialData,
        { transaction: t },
      );
    }
  } else {
    const createdMat = await moduleRepository.createLearningMaterial(
      moduleId,
      materialData,
      { transaction: t },
    );
    targetMaterialId = createdMat.id;
  }

  if (assets !== undefined && Array.isArray(assets) && targetMaterialId) {
    const currentAssets = (existingMaterial && existingMaterial.assets) || [];

    await syncAssets(moduleRepository, assets, currentAssets, targetMaterialId, {
      movedFiles,
      oldFilesToDelete,
      t,
    });
  }
};

const syncAssets = async (
  moduleRepository,
  assets,
  currentAssets,
  targetMaterialId,
  { movedFiles, oldFilesToDelete, t },
) => {
  const incomingAssetIds = assets
    .filter((a) => a.id)
    .map((a) => Number(a.id));

  const deletedAssets = currentAssets.filter(
    (ca) => !incomingAssetIds.includes(ca.id),
  );

  for (const deletedAsset of deletedAssets) {
    if (deletedAsset.title) {
      oldFilesToDelete.push(deletedAsset.title);
    }
    await moduleRepository.deleteAssetWithLinks(deletedAsset.id, {
      transaction: t,
    });
  }

  for (const assetPayload of assets) {
    const { id: assetId, ...assetData } = assetPayload;

    let assetTitle = assetData.path || assetData.title;

    if (assetTitle && assetTitle.startsWith("temp/")) {
      const permanentPath = assetTitle.replace(/^temp\//, "");
      await fileRepository.move(assetTitle, permanentPath);
      movedFiles.push({ from: assetTitle, to: permanentPath });
      assetTitle = permanentPath;
    }

    if (assetTitle !== undefined) {
      assetData.title = assetTitle;
    }

    delete assetData.path;
    delete assetData.filename;
    delete assetData.originalname;
    delete assetData.mimetype;
    delete assetData.size;
    delete assetData.url;

    if (assetId) {
      if (assetTitle && assetTitle.startsWith("modules/assets/")) {
        const existingAsset = await moduleRepository.findAssetById(assetId, {
          transaction: t,
        });
        if (
          existingAsset &&
          existingAsset.title &&
          existingAsset.title !== assetTitle
        ) {
          oldFilesToDelete.push(existingAsset.title);
        }
      }

      if (Object.keys(assetData).length > 0) {
        await moduleRepository.updateAsset(assetId, assetData, {
          transaction: t,
        });
      }
    } else {
      if (!assetData.type && assetData.title) {
        assetData.type = getTypeFromExtension(assetData.title);
      }

      const createdAsset = await moduleRepository.createAsset(assetData, {
        transaction: t,
      });
      await moduleRepository.createLearningMaterialAssetLink(
        targetMaterialId,
        createdAsset.id,
        { transaction: t },
      );
    }
  }
};
