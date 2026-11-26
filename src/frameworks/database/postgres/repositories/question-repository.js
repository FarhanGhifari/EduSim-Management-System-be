const { Op } = require("sequelize");
const AppError = require("../../../helpers/app-error");

module.exports = (models) => {
  const {
    question: questionModel,
    questionOption: questionOptionModel,
    module: moduleModel,
  } = models;

  async function index(
    {
      search,
      moduleId,
      formType,
      sort = "ASC",
      sortBy = "id",
      offset,
      limit,
    } = {},
  ) {
    const where = {};

    if (search) {
      where.question = { [Op.iLike]: `%${search}%` };
    }

    if (moduleId) {
      where.module_id = moduleId;
    }

    if (formType) {
      where.form_type = formType;
    }

    return questionModel.findAndCountAll({
      where,
      include: [
        {
          model: moduleModel,
          as: "module",
          attributes: ["id", "title"],
        },
      ],
      limit,
      offset,
      distinct: true,
      order: [[sortBy, sort]],
    });
  }

  async function show(id, options = {}) {
    return questionModel.findOne({
      where: { id },
      include: [
        {
          model: moduleModel,
          as: "module",
          attributes: ["id", "title"],
        },
        {
          model: questionOptionModel,
          as: "options",
          attributes: ["id", "answer", "is_correct"],
        },
      ],
      transaction: options.transaction,
    });
  }

  async function create(payload, options = {}) {
    try {
      return await questionModel.create(payload, {
        transaction: options.transaction,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function createOption(payload, options = {}) {
    try {
      return await questionOptionModel.create(payload, {
        transaction: options.transaction,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function bulkCreateOptions(optionsData, options = {}) {
    try {
      return await questionOptionModel.bulkCreate(optionsData, {
        transaction: options.transaction,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function update(id, payload, options = {}) {
    try {
      await questionModel.update(payload, {
        where: { id },
        transaction: options.transaction,
      });

      return questionModel.findOne({
        where: { id },
        transaction: options.transaction,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function destroyOptions(questionId, options = {}) {
    return questionOptionModel.destroy({
      where: { question_id: questionId },
      transaction: options.transaction,
    });
  }

  async function destroy(id, options = {}) {
    const questionData = await questionModel.findOne({
      where: { id },
      transaction: options.transaction,
    });

    if (!questionData) {
      return null;
    }

    await questionOptionModel.destroy({
      where: { question_id: id },
      transaction: options.transaction,
    });

    await questionData.destroy({ transaction: options.transaction });

    return questionData;
  }

  async function findModuleById(moduleId) {
    return moduleModel.findOne({ where: { id: moduleId } });
  }

  function transaction(callback) {
    return questionModel.sequelize.transaction(callback);
  }

  return {
    index,
    show,
    create,
    createOption,
    bulkCreateOptions,
    update,
    destroyOptions,
    destroy,
    findModuleById,
    transaction,
  };
};
