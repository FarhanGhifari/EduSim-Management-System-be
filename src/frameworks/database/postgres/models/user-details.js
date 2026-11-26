const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserDetails = sequelize.define(
    "UserDetails",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      registration_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      work_unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_education: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "user_details",
    },
  );

  UserDetails.associate = (models) => {
    UserDetails.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });

    UserDetails.belongsTo(models.class, {
      foreignKey: "class_id",
      as: "class",
    });
  };

  return UserDetails;
};
