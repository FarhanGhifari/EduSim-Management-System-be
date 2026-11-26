const AppError = require("../../../frameworks/helpers/app-error");

module.exports = async (repositories, userId) => {
  const { userRepository } = repositories;

  const user = await userRepository.show(userId);
  if (!user) {
    throw new AppError("Pengguna tidak ditemukan", 404);
  }

  const name = user.userDetails ? user.userDetails.name : (user.name || null);
  const role = (user.roleLinks && user.roleLinks[0] && user.roleLinks[0].role)
    ? user.roleLinks[0].role.name
    : (user.role || null);

  return {
    name,
    username: user.username,
    role,
  };
};
