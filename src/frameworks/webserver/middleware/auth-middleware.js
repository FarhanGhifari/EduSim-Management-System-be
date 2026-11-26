const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const AppError = require('../../helpers/app-error');

module.exports = (repositories) => {
  const { userRepository } = repositories;

  async function authenticate(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Token tidak disediakan atau format salah', 401);
      }

      const token = authHeader.split(' ')[1];
      let decoded;
      try {
        decoded = jwt.verify(token, config.jwt.secret);
      } catch (err) {
        throw new AppError('Token tidak valid atau kedaluwarsa', 401);
      }

      const user = await userRepository.show(decoded.id);
      if (!user) {
        throw new AppError('Pengguna tidak ditemukan', 401);
      }

      const roleName = user.role || (user.roleLinks && user.roleLinks[0] && user.roleLinks[0].role ? user.roleLinks[0].role.name : null);

      req.user = {
        ...(user.toJSON ? user.toJSON() : user),
        role: roleName,
      };
      next();
    } catch (err) {
      next(err);
    }
  }

  function allowRoles(...roles) {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return next(new AppError("Anda tidak memiliki hak akses untuk halaman ini", 403));
      }
      next();
    };
  }

  return { authenticate, allowRoles };
};
