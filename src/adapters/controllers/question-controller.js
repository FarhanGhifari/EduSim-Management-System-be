const multer = require("multer");

const multerUploadFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /\.(xlsx|xls|csv)$/;
    if (allowed.test(file.originalname.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error("Format file tidak didukung. Harus .xlsx, .xls, atau .csv"), false);
    }
  },
});

module.exports = (useCases) => {
  const {
    findAllWithPaginate,
    createOne,
    updateOne,
    findOneById,
    deleteOne,
    importQuestions,
  } = useCases.questionUseCase;

  async function index(req, res, next) {
    try {
      const query = req.query;
      const params = {
        search: query.search,
        module_id: query.module_id,
        form_type: query.form_type,
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
      const user = req.user;
      let author = req.body.author;
      if (user) {
        const name = user.name || user.username || "Admin";
        const role = user.role || "Admin";
        author = `${name} - ${role}`;
      } else if (!author) {
        author = "Admin - Admin";
      }

      const result = await createOne({
        ...req.body,
        author,
      });

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

  async function importHandler(req, res, next) {
    try {
      const user = req.user;
      let author = "Admin - Admin";
      if (user) {
        const name = user.name || user.username || "Admin";
        const role = user.role || "Admin";
        author = `${name} - ${role}`;
      }

      const result = await importQuestions(req.file, author);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  const uploadMiddleware = multerUploadFile.single("file");

  return { index, show, create, update, destroy, importHandler, uploadMiddleware };
};
