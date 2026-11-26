const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ScheduleQuestion = sequelize.define(
    "ScheduleQuestion",
    {
      schedule_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      question_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    },
    {
      timestamps: false,
      tableName: "schedule_questions",
    }
  );

  ScheduleQuestion.associate = (models) => {
    ScheduleQuestion.belongsTo(models.schedule, {
      foreignKey: "schedule_id",
      as: "schedule",
    });

    ScheduleQuestion.belongsTo(models.question, {
      foreignKey: "question_id",
      as: "question",
    });
  };

  return ScheduleQuestion;
};
