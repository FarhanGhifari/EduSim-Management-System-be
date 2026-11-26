const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Permission = sequelize.define(
    "Permission",
    {
      action: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "permissions",
    }
  );

  Permission.associate = (models) => {
    Permission.hasMany(models.permissionsRoleLink, {
      foreignKey: "permission_id",
      as: "permissionRoleLinks",
    });

    Permission.belongsToMany(models.role, {
      through: models.permissionsRoleLink,
      foreignKey: "permission_id",
      otherKey: "role_id",
      as: "roles",
    });
  };

  return Permission;
};
