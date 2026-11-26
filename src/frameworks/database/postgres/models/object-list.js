const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ObjectList = sequelize.define(
    "ObjectList",
    {
      object_id: { type: DataTypes.BIGINT, allowNull: false, unique: true },
      game_object_name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      action_available: { type: DataTypes.JSON, allowNull: false },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "object_list",
    }
  );

  ObjectList.associate = (models) => {
    // Independent table, no relations defined in current schema
  };

  return ObjectList;
};
