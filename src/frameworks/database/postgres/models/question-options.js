const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const QuestionOption = sequelize.define(
    "QuestionOption",
    {
      question_id: { type: DataTypes.INTEGER, allowNull: true },
      answer: { type: DataTypes.TEXT, allowNull: true },
      is_correct: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
    },
    {
      timestamps: false,
      tableName: "question_options",
    }
  );

  QuestionOption.associate = (models) => {
    QuestionOption.belongsTo(models.question, {
      foreignKey: "question_id",
      as: "question",
    });
  };

  return QuestionOption;
};
