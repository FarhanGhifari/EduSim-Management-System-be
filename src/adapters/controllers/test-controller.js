module.exports = (useCases) => {
  const {
    findAllWithPaginate,
    createOne,
    updateOne,
    findOneById,
    deleteOne,
  } = useCases.testUseCase;

  async function index(req, res, next) {
    try {
      const query = req.query;
      const isStudent = req.user.role === "Siswa";
      const studentClassId = req.user.userDetails
        ? req.user.userDetails.class_id
        : null;

      const params = {
        search: query.search,
        module_id: query.module_id,
        class_id: query.class_id,
        schedule_type: query.schedule_type,
        status: isStudent ? "Active" : query.status,
        page: query.page || 1,
        limit: query.limit || 10,
        sort: query.sort,
        sortType: query.sortType,
        isStudent,
        studentClassId,
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
      const isStudent = req.user.role === "Siswa";
      const studentClassId = req.user.userDetails
        ? req.user.userDetails.class_id
        : null;
      const result = await findOneById(id, isStudent, studentClassId);

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
