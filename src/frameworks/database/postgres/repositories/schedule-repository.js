const { Op } = require("sequelize");
const AppError = require("../../../helpers/app-error");

module.exports = (models) => {
  const {
    schedule: scheduleModel,
    module: moduleModel,
    class: classModel,
    question: questionModel,
    testAttempt: testAttemptModel,
  } = models;

  const scheduleAttributes = [
    "id",
    "title",
    "schedule_type",
    "date",
    "duration_minutes",
    "max_question",
    "status",
    "is_locked",
  ];

  const moduleInclude = {
    model: moduleModel,
    as: "module",
    attributes: ["id", "title"],
  };

  const classInclude = {
    model: classModel,
    as: "class",
    attributes: ["id", "name"],
  };

  async function index(
    {
      search,
      moduleId,
      classId,
      scheduleType,
      status,
      sort = "ASC",
      sortBy = "id",
      offset,
      limit,
    } = {}
  ) {
    const where = {};

    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }

    if (moduleId) {
      where.module_id = moduleId;
    }

    if (classId) {
      where.class_id = classId;
    }

    if (scheduleType) {
      where.schedule_type = scheduleType;
    }

    if (status) {
      where.status = status;
    }

    return scheduleModel.findAndCountAll({
      where,
      attributes: scheduleAttributes,
      include: [moduleInclude, classInclude],
      limit,
      offset,
      distinct: true,
      order: [[sortBy, sort]],
    });
  }

  async function show(id, options = {}) {
    return scheduleModel.findOne({
      where: { id },
      attributes: scheduleAttributes,
      include: [moduleInclude, classInclude],
      transaction: options.transaction,
    });
  }

  async function create(payload, options = {}) {
    try {
      return await scheduleModel.create(payload, {
        transaction: options.transaction,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function update(id, payload, options = {}) {
    try {
      await scheduleModel.update(payload, {
        where: { id },
        transaction: options.transaction,
      });

      return scheduleModel.findOne({
        where: { id },
        attributes: scheduleAttributes,
        include: [moduleInclude, classInclude],
        transaction: options.transaction,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function destroy(id, options = {}) {
    const scheduleData = await scheduleModel.findOne({
      where: { id },
      transaction: options.transaction,
    });

    if (!scheduleData) {
      return null;
    }

    try {
      await scheduleData.destroy({ transaction: options.transaction });
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        throw new AppError(
          "Test schedule cannot be deleted because it already has student test attempts attached",
          409
        );
      }
      throw error;
    }

    return scheduleData;
  }

  async function countActiveQuestions(moduleId, testType) {
    const where = {
      module_id: moduleId,
      status: true,
    };

    if (testType) {
      where.form_type = testType;
    }

    return questionModel.count({ where });
  }

  async function hasTestAttempts(scheduleId, options = {}) {
    const count = await testAttemptModel.count({
      where: { schedule_id: scheduleId },
      transaction: options.transaction,
    });

    return count > 0;
  }

  async function findActiveSchedulesForStudent(
    {
      search,
      scheduleType,
      classId,
      sort = "ASC",
      sortBy = "date",
      offset,
      limit,
    } = {}
  ) {
    if (!classId) {
      return { count: 0, rows: [] };
    }

    const where = {
      status: "Active",
      class_id: classId,
    };

    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }

    if (scheduleType) {
      where.schedule_type = scheduleType;
    }

    return scheduleModel.findAndCountAll({
      where,
      include: [moduleInclude, classInclude],
      attributes: [
        "id",
        "title",
        "schedule_type",
        "date",
        "duration_minutes",
        "max_question",
        "status",
      ],
      limit,
      offset,
      distinct: true,
      order: [[sortBy, sort]],
    });
  }

  async function showActiveScheduleForStudent(scheduleId, classId) {
    if (!classId) {
      return null;
    }

    return scheduleModel.findOne({
      where: {
        id: scheduleId,
        status: "Active",
        class_id: classId,
      },
      include: [moduleInclude, classInclude],
      attributes: [
        "id",
        "title",
        "schedule_type",
        "date",
        "duration_minutes",
        "max_question",
        "status",
      ],
    });
  }

  function findModuleById(moduleId) {
    return moduleModel.findOne({ where: { id: moduleId } });
  }

  function findClassById(classId) {
    return classModel.findOne({ where: { id: classId } });
  }

  function transaction(callback) {
    return scheduleModel.sequelize.transaction(callback);
  }

  return {
    index,
    show,
    create,
    update,
    destroy,
    countActiveQuestions,
    hasTestAttempts,
    findActiveSchedulesForStudent,
    showActiveScheduleForStudent,
    findModuleById,
    findClassById,
    transaction,
  };
};
