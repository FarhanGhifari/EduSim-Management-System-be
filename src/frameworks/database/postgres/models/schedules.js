const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      module_id: { type: DataTypes.INTEGER, allowNull: true },
      class_id: { type: DataTypes.INTEGER, allowNull: true },
      title: { type: DataTypes.STRING(255), allowNull: true },
      schedule_type: { type: DataTypes.STRING(255), allowNull: true },
      date: { type: DataTypes.DATE, allowNull: true },
      duration_minutes: { type: DataTypes.INTEGER, allowNull: true },
      max_question: { type: DataTypes.INTEGER, allowNull: true },
      status: { type: DataTypes.STRING(255), allowNull: true },
      is_locked: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "schedule",
    }
  );

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.module, {
      foreignKey: "module_id",
      as: "module",
    });

    Schedule.belongsTo(models.class, {
      foreignKey: "class_id",
      as: "class",
    });

    Schedule.hasMany(models.scheduleQuestion, {
      foreignKey: "schedule_id",
      as: "scheduleQuestions",
    });

    Schedule.hasMany(models.testAttempt, {
      foreignKey: "schedule_id",
      as: "testAttempts",
    });

    Schedule.belongsToMany(models.question, {
      through: models.scheduleQuestion,
      foreignKey: "schedule_id",
      otherKey: "question_id",
      as: "questions",
    });
  };

  return Schedule;
};
