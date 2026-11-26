const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UsersRoleLink = sequelize.define(
    "UsersRoleLink",
    {
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      role_id: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "users_role_links",
    }
  );

  UsersRoleLink.associate = (models) => {
    UsersRoleLink.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });

    UsersRoleLink.belongsTo(models.role, {
      foreignKey: "role_id",
      as: "role",
    });
  };

  return UsersRoleLink;
};
