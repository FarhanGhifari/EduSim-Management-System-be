module.exports = (useCases) => {
  const { authLogin } = useCases.authUseCase

  async function login(req, res, next) {
    try {
      const result = await authLogin(req.body)

      return res.json(result)
    } catch (e) {
      next(e)
    }
  }

  return { login }
}
