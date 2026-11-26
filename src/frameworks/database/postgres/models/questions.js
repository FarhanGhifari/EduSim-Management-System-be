const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Question = sequelize.define(
    "Question",
    {
      module_id: { type: DataTypes.INTEGER, allowNull: true },
      question: { type: DataTypes.TEXT, allowNull: true },
      form_type: { type: DataTypes.STRING(255), allowNull: true },
      status: { type: DataTypes.BOOLEAN, allowNull: true },
      author: { type: DataTypes.STRING(255), allowNull: true, defaultValue: "Developer" },
      created_at: { type: DataTypes.DATE, allowNull: true },
      updated_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "question",
    }
  );

  Question.associate = (models) => {
    Question.belongsTo(models.module, {
      foreignKey: "module_id",
      as: "module",
    });

    Question.hasMany(models.questionOption, {
      foreignKey: "question_id",
      as: "options",
    });

    Question.hasMany(models.scheduleQuestion, {
      foreignKey: "question_id",
      as: "scheduleQuestions",
    });

    Question.hasMany(models.attemptDetails, {
      foreignKey: "question_id",
      as: "attemptDetails",
    });

    Question.belongsToMany(models.schedule, {
      through: models.scheduleQuestion,
      foreignKey: "question_id",
      otherKey: "schedule_id",
      as: "schedules",
    });
  };

  return Question;
};
