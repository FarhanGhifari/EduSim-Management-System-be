const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Report = sequelize.define(
    "Report",
    {
      log_id: { type: DataTypes.INTEGER, allowNull: true },
      score: { type: DataTypes.FLOAT, allowNull: true },
      total_step: { type: DataTypes.INTEGER, allowNull: true },
      correct_step: { type: DataTypes.INTEGER, allowNull: true },
      time_taken: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "reports",
    }
  );

  Report.associate = (models) => {
    Report.belongsTo(models.log, {
      foreignKey: "log_id",
      as: "log",
    });
  };

  return Report;
};
