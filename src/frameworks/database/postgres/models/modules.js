const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Module = sequelize.define(
    "Module",
    {
      title: { type: DataTypes.STRING(255), allowNull: false },
      parent_id: { type: DataTypes.INTEGER, allowNull: true },
      type: { type: DataTypes.STRING(255), allowNull: false },
      meta: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
      count: { type: DataTypes.JSON, allowNull: true, defaultValue: 0 },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "modules",
    }
  );

  Module.associate = (models) => {
    Module.hasMany(models.module, {
      foreignKey: "parent_id",
      as: "children",
    });

    Module.belongsTo(models.module, {
      foreignKey: "parent_id",
      as: "parent",
    });

    Module.hasMany(models.learningMaterial, {
      foreignKey: "module_id",
      as: "learningMaterials",
    });

    Module.hasMany(models.question, {
      foreignKey: "module_id",
      as: "questions",
    });

    Module.hasMany(models.schedule, {
      foreignKey: "module_id",
      as: "schedules",
    });

    Module.hasMany(models.log, {
      foreignKey: "module_id",
      as: "logs",
    });
  };

  return Module;
};
