module.exports = (useCases) => {
  const { getProfile, updateProfileInfo, updateProfilePassword } = useCases.profileUseCase;

  async function showProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await getProfile(userId);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async function updateInfo(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await updateProfileInfo(userId, req.body);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async function updatePassword(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await updateProfilePassword(userId, req.body);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  return { showProfile, updateInfo, updatePassword };
};
