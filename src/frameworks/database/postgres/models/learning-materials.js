const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const LearningMaterial = sequelize.define(
    "LearningMaterial",
    {
      module_id: { type: DataTypes.INTEGER, allowNull: true },
      title: { type: DataTypes.STRING(255), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "learning_materials",
    }
  );

  LearningMaterial.associate = (models) => {
    LearningMaterial.belongsTo(models.module, {
      foreignKey: "module_id",
      as: "module",
    });

    LearningMaterial.hasMany(models.learningMaterialAssetLink, {
      foreignKey: "learning_materials_id",
      as: "assetLinks",
    });

    LearningMaterial.belongsToMany(models.asset, {
      through: models.learningMaterialAssetLink,
      foreignKey: "learning_materials_id",
      otherKey: "assets_id",
      as: "assets",
    });
  };

  return LearningMaterial;
};
