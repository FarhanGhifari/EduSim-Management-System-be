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

const resolveAssetUrl = async (asset) => {
  if (!asset) return null;
  const assetData = asset.toJSON ? asset.toJSON() : { ...asset };

  let url = assetData.url || null;
  const assetTitleOrPath = assetData.path || assetData.title;

  if (!url && assetTitleOrPath) {
    if (assetTitleOrPath.startsWith("http://") || assetTitleOrPath.startsWith("https://")) {
      url = assetTitleOrPath;
    } else {
      try {
        url = await fileRepository.getUrl(assetTitleOrPath);
      } catch (err) {
        url = null;
      }
    }
  }

  return {
    ...assetData,
    url,
  };
};

module.exports = async (repositories, id, userRole) => {
  const { moduleRepository } = repositories;

  validate({ id });

  const result = await moduleRepository.showDetail(id);

  if (!result) throw new AppError("Module not found", 404);

  const data = result.toJSON ? result.toJSON() : result;
  const isSiswa = userRole === "Siswa";

  const hierarchyFields = buildHierarchyFields(data);

  const rawMaterials = data.learningMaterials || [];
  const formattedMaterials = await Promise.all(
    rawMaterials.map((material) => formatMaterial(material, isSiswa)),
  );

  if (isSiswa) {
    return {
      id: data.id,
      title: data.title,
      type: data.type,
      ...hierarchyFields,
      learningMaterials: formattedMaterials,
    };
  }

  const childrenCount = data.children && data.children.length > 0
    ? data.children.length
    : (typeof data.count === "number" ? data.count : 0);

  return {
    id: data.id,
    title: data.title,
    type: data.type,
    ...hierarchyFields,
    meta: data.meta,
    count: childrenCount,
    learningMaterials: formattedMaterials,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};

const buildHierarchyFields = (data) => {
  const fields = {};

  if (data.type === "content") {
    fields.submodule_name = data.parent ? data.parent.title : null;
    fields.module_name = data.parent && data.parent.parent ? data.parent.parent.title : null;
  } else if (data.type === "sub_module") {
    fields.module_name = data.parent ? data.parent.title : null;
  }

  return fields;
};

const formatMaterial = async (material, isSiswa) => {
  const rawAssets = material.assets || [];
  const resolvedAssets = await Promise.all(
    rawAssets.map(async (asset) => {
      const resolved = await resolveAssetUrl(asset);
      if (isSiswa) {
        return { id: resolved.id, title: resolved.title, type: resolved.type, url: resolved.url };
      }
      return resolved;
    }),
  );

  if (isSiswa) {
    return {
      id: material.id,
      title: material.title,
      description: material.description,
      assets: resolvedAssets,
    };
  }

  return { ...material, assets: resolvedAssets };
};
