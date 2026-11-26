const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AttemptDetail = sequelize.define(
    "AttemptDetail",
    {
      attempt_id: { type: DataTypes.INTEGER, allowNull: true },
      question_id: { type: DataTypes.INTEGER, allowNull: true },
      selected_option_id: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      timestamps: false,
      tableName: "attempt_details",
    }
  );

  AttemptDetail.associate = (models) => {
    AttemptDetail.belongsTo(models.testAttempt, {
      foreignKey: "attempt_id",
      as: "attempt",
    });

    AttemptDetail.belongsTo(models.question, {
      foreignKey: "question_id",
      as: "question",
    });

    AttemptDetail.belongsTo(models.questionOption, {
      foreignKey: "selected_option_id",
      as: "selectedOption",
    });
  };

  return AttemptDetail;
};
