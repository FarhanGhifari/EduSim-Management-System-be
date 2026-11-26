const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Class = sequelize.define(
    "Class",
    {
      name: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "classes",
    }
  );

  Class.associate = (models) => {
    Class.hasMany(models.userDetails, {
      foreignKey: "class_id",
      as: "members",
    });

    Class.hasMany(models.schedule, {
      foreignKey: "class_id",
      as: "schedules",
    });
  };

  return Class;
};
