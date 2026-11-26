const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Asset = sequelize.define(
    "Asset",
    {
      title: { type: DataTypes.STRING(255), allowNull: true },
      type: { type: DataTypes.STRING(255), allowNull: true },
      order_index: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "assets",
    }
  );

  Asset.associate = (models) => {
    Asset.hasMany(models.learningMaterialAssetLink, {
      foreignKey: "assets_id",
      as: "materialLinks",
    });

    Asset.belongsToMany(models.learningMaterial, {
      through: models.learningMaterialAssetLink,
      foreignKey: "assets_id",
      otherKey: "learning_materials_id",
      as: "learningMaterials",
    });
  };

  return Asset;
};
