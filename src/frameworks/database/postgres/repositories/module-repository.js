const { Op } = require("sequelize");
const AppError = require("../../../helpers/app-error");

module.exports = (models) => {
  const { module: moduleModel, learningMaterial, asset: assetModel } = models;

  async function index(
    { search, parentId, type, sort = "ASC", sortBy = "id", offset, limit, include: optInclude } = {},
    include = [],
  ) {
    const where = {};

    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }

    if (parentId !== undefined) {
      where.parent_id = parentId;
    }

    if (type) {
      where.type = type;
    }

    const queryInclude = optInclude || include;

    return moduleModel.findAndCountAll({
      where,
      include: queryInclude,
      limit,
      offset,
      distinct: true,
      order: [[sortBy, sort]],
    });
  }

  async function show(id, include = [], options = {}) {
    return moduleModel.findOne({
      where: { id },
      include,
      transaction: options.transaction,
    });
  }

  async function showDetail(id, options = {}) {
    return moduleModel.findOne({
      where: { id },
      include: [
        {
          association: "parent",
          include: [
            {
              association: "parent",
            },
          ],
        },
        {
          association: "children",
          attributes: ["id"],
        },
        {
          association: "learningMaterials",
          include: [
            {
              association: "assets",
            },
          ],
        },
      ],
      transaction: options.transaction,
    });
  }

  async function create(payload) {
    try {
      return await transaction(async (t) => {
        const { learningMaterials, ...modulePayload } = payload;

        const createdModule = await moduleModel.create(modulePayload, {
          transaction: t,
        });

        if (learningMaterials && learningMaterials.length > 0) {
          for (const material of learningMaterials) {
            const { assets = [], ...materialData } = material;

            const createdMaterial = await learningMaterial.create(
              {
                ...materialData,
                module_id: createdModule.id,
              },
              { transaction: t },
            );

            if (assets && assets.length > 0) {
              for (const assetData of assets) {
                const createdAsset = await assetModel.create(assetData, {
                  transaction: t,
                });

                await models.learningMaterialAssetLink.create(
                  {
                    learning_materials_id: createdMaterial.id,
                    assets_id: createdAsset.id,
                  },
                  { transaction: t },
                );
              }
            }
          }
        }

        return show(
          createdModule.id,
          [
            {
              association: "learningMaterials",
              include: [
                {
                  association: "assets",
                },
              ],
            },
          ],
          { transaction: t },
        );
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  function transaction(callback) {
    return moduleModel.sequelize.transaction(callback);
  }

  async function update(id, payload, options = {}) {
    try {
      await moduleModel.update(payload, {
        where: { id },
        transaction: options.transaction,
      });

      return show(id, [], options);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function createLearningMaterial(moduleId, payload, options = {}) {
    try {
      return await learningMaterial.create(
        {
          ...payload,
          module_id: moduleId,
        },
        {
          transaction: options.transaction,
        },
      );
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function updateLearningMaterial(
    moduleId,
    learningMaterialId,
    payload,
    options = {},
  ) {
    try {
      await learningMaterial.update(payload, {
        where: {
          id: learningMaterialId,
          module_id: moduleId,
        },
        transaction: options.transaction,
      });

      return learningMaterial.findOne({
        where: {
          id: learningMaterialId,
          module_id: moduleId,
        },
        transaction: options.transaction,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function createAsset(payload, options = {}) {
    try {
      return await assetModel.create(payload, {
        transaction: options.transaction,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function updateAsset(id, payload, options = {}) {
    try {
      await assetModel.update(payload, {
        where: { id },
        transaction: options.transaction,
      });

      return assetModel.findOne({
        where: { id },
        transaction: options.transaction,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function createLearningMaterialAssetLink(
    learningMaterialId,
    assetId,
    options = {},
  ) {
    try {
      return await models.learningMaterialAssetLink.create(
        {
          learning_materials_id: learningMaterialId,
          assets_id: assetId,
        },
        {
          transaction: options.transaction,
        },
      );
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function destroyWithCascade(id) {
    const targetModule = await show(id);
    if (!targetModule) return null;

    // 1. Ambil semua ID modul turunan (anak, cucu, dll.) secara hirarkis
    const allIds = [Number(id)];
    let currentLevelIds = [Number(id)];

    while (currentLevelIds.length > 0) {
      const children = await moduleModel.findAll({
        where: { parent_id: { [Op.in]: currentLevelIds } },
        attributes: ["id"],
      });

      if (!children || children.length === 0) break;
      const nextIds = children.map((c) => c.id);
      allIds.push(...nextIds);
      currentLevelIds = nextIds;
    }

    // 2. Ambil semua learning materials & assets yang terkait dengan allIds
    const materials = await learningMaterial.findAll({
      where: { module_id: { [Op.in]: allIds } },
      include: [
        {
          association: "assets",
        },
      ],
    });

    const materialIds = materials.map((m) => m.id);
    const filesToDelete = [];
    const assetIds = [];

    for (const mat of materials) {
      const assets = mat.assets || [];
      for (const asset of assets) {
        assetIds.push(asset.id);
        const filePath = asset.path || asset.title;
        if (filePath && !filePath.startsWith("http://") && !filePath.startsWith("https://")) {
          filesToDelete.push(filePath);
        }
      }
    }

    // 3. Transaksi DB: hapus links, assets, learning materials, dan modules
    await transaction(async (t) => {
      if (assetIds.length > 0) {
        await models.learningMaterialAssetLink.destroy({
          where: { assets_id: { [Op.in]: assetIds } },
          transaction: t,
        });

        await assetModel.destroy({
          where: { id: { [Op.in]: assetIds } },
          transaction: t,
        });
      }

      if (materialIds.length > 0) {
        await learningMaterial.destroy({
          where: { id: { [Op.in]: materialIds } },
          transaction: t,
        });
      }

      // Nullify parent_id terlebih dahulu untuk mencegah error foreign key constraint self-reference
      await moduleModel.update(
        { parent_id: null },
        {
          where: { id: { [Op.in]: allIds } },
          transaction: t,
        },
      );

      // Hapus seluruh modul dari tabel modules
      await moduleModel.destroy({
        where: { id: { [Op.in]: allIds } },
        transaction: t,
      });
    });

    return {
      deletedModuleIds: allIds,
      filesToDelete,
    };
  }

  async function destroy(id) {
    return destroyWithCascade(id);
  }

  async function findAssetById(id, options = {}) {
    return assetModel.findOne({
      where: { id },
      transaction: options.transaction,
    });
  }

  async function deleteAssetWithLinks(assetId, options = {}) {
    await models.learningMaterialAssetLink.destroy({
      where: { assets_id: assetId },
      transaction: options.transaction,
    });

    await assetModel.destroy({
      where: { id: assetId },
      transaction: options.transaction,
    });
  }

  async function deleteLearningMaterialWithLinks(learningMaterialId, options = {}) {
    const links = await models.learningMaterialAssetLink.findAll({
      where: { learning_materials_id: learningMaterialId },
      transaction: options.transaction,
    });
    const assetIds = links.map((l) => l.assets_id);

    await models.learningMaterialAssetLink.destroy({
      where: { learning_materials_id: learningMaterialId },
      transaction: options.transaction,
    });

    if (assetIds.length > 0) {
      await assetModel.destroy({
        where: { id: { [Op.in]: assetIds } },
        transaction: options.transaction,
      });
    }

    await learningMaterial.destroy({
      where: { id: learningMaterialId },
      transaction: options.transaction,
    });
  }

  return {
    transaction,
    index,
    show,
    showDetail,
    create,
    update,
    createLearningMaterial,
    updateLearningMaterial,
    createAsset,
    updateAsset,
    createLearningMaterialAssetLink,
    findAssetById,
    deleteAssetWithLinks,
    deleteLearningMaterialWithLinks,
    destroyWithCascade,
    destroy,
  };
};
