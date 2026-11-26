const { Op } = require("sequelize");
const AppError = require("../../../helpers/app-error");

module.exports = (models) => {
  const {
    class: classModel,
    userDetails: userDetailsModel,
    schedule: scheduleModel,
  } = models;

  async function index(
    { search, sort = "ASC", sortBy = "id", offset, limit } = {}
  ) {
    const where = {};

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    return classModel.findAndCountAll({
      where,
      limit,
      offset,
      distinct: true,
      order: [[sortBy, sort]],
    });
  }

  async function show(id) {
    return classModel.findOne({
      where: { id },
      include: [
        {
          model: userDetailsModel,
          as: "members",
          attributes: ["user_id", "name", "registration_number"],
        },
      ],
    });
  }

  function findById(id) {
    return classModel.findOne({ where: { id } });
  }

  async function create(payload) {
    try {
      return await classModel.create(payload);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function update(id, payload) {
    try {
      await classModel.update(payload, { where: { id } });

      return classModel.findOne({ where: { id } });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async function destroy(id) {
    const classData = await classModel.findOne({ where: { id } });

    if (!classData) {
      return null;
    }

    try {
      await classData.destroy();
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        throw new AppError("Class is still used by one or more tests", 409);
      }
      throw error;
    }

    return classData;
  }

  function countMembers(classId) {
    return userDetailsModel.count({ where: { class_id: classId } });
  }

  function countSchedules(classId) {
    return scheduleModel.count({ where: { class_id: classId } });
  }

  return {
    index,
    show,
    findById,
    create,
    update,
    destroy,
    countMembers,
    countSchedules,
  };
};
