const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TestAttempt = sequelize.define(
    "TestAttempt",
    {
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      schedule_id: { type: DataTypes.INTEGER, allowNull: true },
      status: { type: DataTypes.STRING(25), allowNull: true },
      score: { type: DataTypes.FLOAT, allowNull: true },
      is_calculated: { type: DataTypes.BOOLEAN, allowNull: true },
      start_time: { type: DataTypes.DATE, allowNull: true },
      end_time: { type: DataTypes.DATE, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "test_attempts",
    }
  );

  TestAttempt.associate = (models) => {
    TestAttempt.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });

    TestAttempt.belongsTo(models.schedule, {
      foreignKey: "schedule_id",
      as: "schedule",
    });

    TestAttempt.hasMany(models.attemptDetails, {
      foreignKey: "attempt_id",
      as: "attemptDetails",
    });
  };

  return TestAttempt;
};
