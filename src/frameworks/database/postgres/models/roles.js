const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      name: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
      type: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "roles",
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.usersRoleLink, {
      foreignKey: "role_id",
      as: "roleLinks",
    });

    Role.hasMany(models.permissionsRoleLink, {
      foreignKey: "role_id",
      as: "permissionRoleLinks",
    });

    Role.belongsToMany(models.user, {
      through: models.usersRoleLink,
      foreignKey: "role_id",
      otherKey: "user_id",
      as: "users",
    });

    Role.belongsToMany(models.permission, {
      through: models.permissionsRoleLink,
      foreignKey: "role_id",
      otherKey: "permission_id",
      as: "permissions",
    });
  };

  return Role;
};
