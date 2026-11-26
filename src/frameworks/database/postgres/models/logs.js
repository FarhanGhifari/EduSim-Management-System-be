const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Log = sequelize.define(
    "Log",
    {
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      module_id: { type: DataTypes.INTEGER, allowNull: true },
      mode: { type: DataTypes.STRING(255), allowNull: true },
      start_time: { type: DataTypes.DATE, allowNull: true },
      end_time: { type: DataTypes.DATE, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "logs",
    }
  );

  Log.associate = (models) => {
    Log.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });

    Log.belongsTo(models.module, {
      foreignKey: "module_id",
      as: "module",
    });

    Log.hasMany(models.stepResult, {
      foreignKey: "log_id",
      as: "stepResults",
    });

    Log.hasMany(models.report, {
      foreignKey: "log_id",
      as: "reports",
    });
  };

  return Log;
};
