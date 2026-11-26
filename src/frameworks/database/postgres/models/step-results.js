const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StepResult = sequelize.define(
    "StepResult",
    {
      log_id: { type: DataTypes.INTEGER, allowNull: true },
      game_object_name: { type: DataTypes.STRING(255), allowNull: true },
      step_name: { type: DataTypes.STRING(255), allowNull: true },
      is_correct: { type: DataTypes.BOOLEAN, allowNull: true },
      timestamp: { type: DataTypes.DATE, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "step_results",
    }
  );

  StepResult.associate = (models) => {
    StepResult.belongsTo(models.log, {
      foreignKey: "log_id",
      as: "log",
    });
  };

  return StepResult;
};
