const { Op } = require("sequelize");
const AppError = require("../../../helpers/app-error");

module.exports = (models) => {
  const { user, userDetails, usersRoleLink } = models;

  async function index({
      search,
      status,
      roleId,
      sort = "ASC",
      sortBy = "id",
      offset,
      limit,
    }, include = [
      {
        association: "userDetails",
        required: false,
        include: [{ association: "class" }],
      },
      {
        association: "roleLinks",
        required: false,
        include: [{ association: "role" }],
      },
    ]) {

    const orderBy = [[sortBy, sort]]
    const where = {};

    if (status) {
      if (status === "Active") {
        where.confirmed = true;
        where.blocked = false;
      } else if (status === "Not Active" || status === "Belum Aktif") {
        where[Op.or] = [{ confirmed: false }, { blocked: true }];
      }
    }

    if (search) {
      where[Op.and] = where[Op.and] || [];
      where[Op.and].push({
        [Op.or]: [
          { username: { [Op.iLike]: `%${search}%` } },
          { "$userDetails.name$": { [Op.iLike]: `%${search}%` } },
        ],
      });
    }

    if(roleId){
      where["$roleLinks.role_id$"] = roleId
    }

    return await user.findAndCountAll({
      where,
      include,
      limit,
      offset,
      subQuery: false,
      distinct: true,
      order: orderBy,
    });
  }

  async function show(id) {
    const foundUser = await user.findOne({
      where: { id },
      include: [
        {
          association: "userDetails",
          required: false,
          include: [{ association: "class" }],
        },
        {
          association: "roleLinks",
          required: false,
          include: [{ association: "role" }],
        },
      ],
    });

    if (!foundUser) return null;

    const roleName =
      foundUser.roleLinks &&
      foundUser.roleLinks[0] &&
      foundUser.roleLinks[0].role
        ? foundUser.roleLinks[0].role.name
        : null;
    const name = foundUser.userDetails ? foundUser.userDetails.name : null;

    return {
      ...foundUser.toJSON(),
      name,
      role: roleName,
    };
  }

  async function create(payload) {    
    const sequelize = user.sequelize;

    try {
      const result = await sequelize.transaction(async (t) => {
        const userResult = await user.create(payload, {
          include: [
            { association: "userDetails" },
            { association: "roleLinks" },
          ],
          transaction: t,
        });

        return userResult;
      });

      return result;
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        throw new AppError("Kelas tidak ditemukan", 404);
      }
      throw new AppError(error.message || error, 400);
    }
  }

  async function update(id, payload) {
    const { userPayload, userDetails, roleLinks } = payload;

    const sequelize = user.sequelize;
    
    try {
      return await sequelize.transaction(async (t) => {
        await user.update(userPayload, {
          where: { id },
          transaction: t,
        });

        await models.userDetails.update(userDetails, {
          where: { user_id: id },
          transaction: t,
        });

        if (roleLinks && roleLinks.length > 0) {
          await usersRoleLink.destroy({
            where: { user_id: id },
            transaction: t,
          });

          await usersRoleLink.bulkCreate(
            roleLinks.map((roleLink) => ({
              ...roleLink,
              user_id: id,
            })),
            { transaction: t },
          );
        }
        
        return user.findByPk(id, {
          include: [
            {
              association: "userDetails",
              required: false,
              include: [{ association: "class" }],
            },
            {
              association: "roleLinks",
              required: false,
              include: [{ association: "role" }],
            },
          ],
          transaction: t,
        });
      });
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        throw new AppError("Kelas tidak ditemukan", 404);
      }
      throw new AppError(error.message || error, 400);
    }
  }

  async function destroy(id) {
    return await user.findOne({ where: { id } }).then((result) => {
      return result.destroy();
    });
  }

  async function findByUsername(username) {
    const foundUser = await user.findOne({
      where: { username },
      include: [
        { association: "userDetails", required: false },
        {
          association: "roleLinks",
          required: false,
          include: [{ association: "role" }],
        },
      ],
    });

    if (!foundUser) return null;

    const roleName = foundUser.roleLinks && foundUser.roleLinks[0] && foundUser.roleLinks[0].role ? foundUser.roleLinks[0].role.name : null;
    const name = foundUser.userDetails ? foundUser.userDetails.name : null;

    return {
      ...foundUser.toJSON(),
      name,
      role: roleName,
    };
  }

  function updateLoginDate(id, loginDate) {
    return user.update({ login_date: loginDate }, { where: { id } });
  }

  async function importUsers(usersList) {
    const sequelize = user.sequelize;

    return sequelize.transaction(async (t) => {
      for (const userData of usersList) {
        const { name, username, password, batchYear, registrationNumber, status, role: roleName } = userData;

        const newUser = await user.create(
          {
            username,
            password,
            confirmed: status === "Active",
            blocked: status !== "Active",
          },
          { transaction: t }
        );

        await models.userDetails.create(
          {
            user_id: newUser.id,
            name,
            registration_number: registrationNumber || batchYear,
          },
          { transaction: t }
        );

        // Assign Siswa role (role_id = 3 by default for Siswa)
        const roleRecord = await models.role.findOne({
          where: { name: roleName },
          transaction: t,
        });

        if (roleRecord) {
          await usersRoleLink.create(
            {
              user_id: newUser.id,
              role_id: roleRecord.id,
            },
            { transaction: t }
          );
        }
      }
    });
  }

  return {
    index,
    show,
    create,
    update,
    destroy,
    findByUsername,
    updateLoginDate,
    importUsers,
  };
};
