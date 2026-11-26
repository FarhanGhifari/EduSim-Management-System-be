const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PermissionsRoleLink = sequelize.define(
    "PermissionsRoleLink",
    {
      permission_id: { type: DataTypes.INTEGER, allowNull: true },
      role_id: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "permissions_role_links",
    }
  );

  PermissionsRoleLink.associate = (models) => {
    PermissionsRoleLink.belongsTo(models.permission, {
      foreignKey: "permission_id",
      as: "permission",
    });

    PermissionsRoleLink.belongsTo(models.role, {
      foreignKey: "role_id",
      as: "role",
    });
  };

  return PermissionsRoleLink;
};
