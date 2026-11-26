const multer = require("multer");
const AppError = require("../../frameworks/helpers/app-error");

const checkExtension = (file, regex) => regex.test(file.originalname.toLowerCase());

const multerUploadFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (checkExtension(file, /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|jpg|jpeg|png|mp4)$/)) {
      cb(null, true);
    } else {
      cb(new AppError("File extension is not supported", 415), false);
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
    uploadFile,
  } = useCases.moduleUseCase;

  async function index(req, res, next) {
    try {
      const query = req.query;
      const userRole = req.user ? req.user.role : null;
      const params = {
        search: query.search,
        parentId: query.parentId,
        type: query.type,
        page: query.page || 1,
        limit: query.limit || 10,
        sort: query.sort,
        sortType: query.sortType,
        userRole,
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
      const userRole = req.user ? req.user.role : null;
      const result = await findOneById(id, userRole);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async function create(req, res, next) {
    try {
      let payload = { ...req.body };
      if (typeof payload.learningMaterials === "string") {
        try {
          payload.learningMaterials = JSON.parse(payload.learningMaterials);
        } catch (e) {
          payload.learningMaterials = undefined;
          throw new AppError("Invalid format for learningMaterials", 400);
        }
      }

      const result = await createOne(payload);

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

      let payload = { ...req.body };
      if (typeof payload.learningMaterials === "string") {
        try {
          payload.learningMaterials = JSON.parse(payload.learningMaterials);
        } catch (e) {
          payload.learningMaterials = undefined;
          throw new AppError("Invalid format for learningMaterials", 400);
        }
      }

      const result = await updateOne(id, payload);

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

  async function upload(req, res, next) {
    try {
      const result = await uploadFile(req.files);

      return res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  const uploadMiddleware = multerUploadFile.array("files");

  return {
    index,
    show,
    create,
    update,
    destroy,
    upload,
    uploadMiddleware,
  };
};
