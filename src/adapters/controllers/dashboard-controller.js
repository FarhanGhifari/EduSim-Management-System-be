module.exports = (useCases) => {
  const { getCounting } = useCases.dashboardUseCase;

  async function counting(req, res, next) {
    try {
      const result = await getCounting();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  return { counting };
};
