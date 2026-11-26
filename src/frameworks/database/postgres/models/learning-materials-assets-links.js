const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const LearningMaterialAssetLink = sequelize.define(
    "LearningMaterialAssetLink",
    {
      learning_materials_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      assets_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "learning_materials_assets_links",
    }
  );

  LearningMaterialAssetLink.associate = (models) => {
    LearningMaterialAssetLink.belongsTo(models.learningMaterial, {
      foreignKey: "learning_materials_id",
      as: "learningMaterial",
    });

    LearningMaterialAssetLink.belongsTo(models.asset, {
      foreignKey: "assets_id",
      as: "asset",
    });
  };

  return LearningMaterialAssetLink;
};
