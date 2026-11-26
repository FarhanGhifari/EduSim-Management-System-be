module.exports = (useCases) => {
  const {
    findAllWithPaginate,
    createOne,
    updateOne,
    findOneById,
    deleteOne,
  } = useCases.classUseCase;

  async function index(req, res, next) {
    try {
      const query = req.query;

      const params = {
        search: query.search,
        page: query.page || 1,
        limit: query.limit || 10,
        sort: query.sort,
        sortType: query.sortType,
      };

      const result = await findAllWithPaginate(params);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async function show(req, res, next) {
    try {
      const id = req.params.id;
      const result = await findOneById(id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async function create(req, res, next) {
    try {
      const result = await createOne(req.body);

      return res.status(201).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async function update(req, res, next) {
    try {
      const id = req.params.id;
      const result = await updateOne(id, req.body);

      return res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async function destroy(req, res, next) {
    try {
      const id = req.params.id;
      await deleteOne(id);

      return res.status(200).json({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  return { index, show, create, update, destroy };
};
