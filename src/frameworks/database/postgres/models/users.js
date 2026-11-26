const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      reset_password_token: { type: DataTypes.STRING, allowNull: true },
      confirmation_token: { type: DataTypes.STRING, allowNull: true },
      confirmed: { type: DataTypes.BOOLEAN, allowNull: false },
      blocked: { type: DataTypes.BOOLEAN, allowNull: false },
      last_login: { type: DataTypes.DATE, allowNull: true },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "users",
    },
  );

  User.associate = (models) => {
    User.hasOne(models.userDetails, {
      foreignKey: "user_id",
      as: "userDetails",
    });

    User.hasMany(models.usersRoleLink, {
      foreignKey: "user_id",
      as: "roleLinks",
    });

    User.hasMany(models.testAttempt, {
      foreignKey: "user_id",
      as: "testAttempts",
    });

    User.hasMany(models.log, {
      foreignKey: "user_id",
      as: "logs",
    });

    User.belongsToMany(models.role, {
      through: models.usersRoleLink,
      foreignKey: "user_id",
      otherKey: "role_id",
      as: "roles",
    });
  };

  return User;
};
