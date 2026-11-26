const Joi = require('joi')
const AppError = require('../../frameworks/helpers/app-error')

module.exports = (useCases) => {
  const {
    findAllWithPaginate,
    createOne,
    updateOne,
    findOneById,
    deleteOne,
    importUsers
  } = useCases.userUseCase

  async function index(req, res, next) {
    try {
      const query = req.query;
      const params = {
        page: query.page || 1,
        limit: query.limit || 10,
        sort: query.sort,
        sortType: query.sortType
      };

      const result = await findAllWithPaginate(params);

      return res.json(result)
    } catch (error) {
      next(error)
    }
  }

  async function show(req, res, next) {
    try {
      const id = req.params.id;

      const result = await findOneById(id);
      
      return res.json(result)
    } catch (error) {
      next(error)
    }
  }

  async function create(req, res, next) {
    try {
      const result = await createOne(req.body);
      return res.json({
        message: "success",
        data: result
      });
    } catch (e) {
      next(e)
    }
  }

  async function update(req, res, next) {
    try {
      const id = req.params.id;

      const result = await updateOne(id, req.body)

      return res.json({
        message: "success",
        data: result
      })
    } catch (error) {
      next(error)
    }
  }

  async function destroy(req, res, next) {
    try {
      const id = req.params.id;
      await deleteOne(id);

      return res.json({
        message: "success"
      })
    } catch (error) {
      next(error)
    }
  }

  async function importUser(req, res, next) {
    try {
      const result = await importUsers(req.file);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  return { index, show, create, update, destroy, importUser }
}
