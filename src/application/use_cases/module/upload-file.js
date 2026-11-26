const path = require("path");
const crypto = require("crypto");
const AppError = require("../../../frameworks/helpers/app-error");
const { fileRepository, getTypeFromExtension } = require("../../../frameworks/helpers/module-helpers");

const ALLOWED_EXTENSIONS_REGEX = /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|jpg|jpeg|png|mp4)$/i;

const sanitizeFilename = (filename) => {
  return filename
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
};

const buildTempFilePath = (filename) => {
  const extension = path.extname(filename);
  const basename = path.basename(filename, extension);
  const uniqueName = `${Date.now()}-${crypto.randomUUID()}-${sanitizeFilename(basename)}${extension.toLowerCase()}`;

  return `temp/modules/assets/${uniqueName}`;
};

module.exports = async (repositories, input) => {
  const fileList = Array.isArray(input) ? input : (input && input.files ? input.files : []);

  if (!fileList || fileList.length === 0) {
    throw new AppError("File is required", 400);
  }

  return Promise.all(
    fileList.map(async (file) => {
      if (!ALLOWED_EXTENSIONS_REGEX.test(file.originalname)) {
        throw new AppError("File extension is not supported", 415);
      }

      const tempPath = buildTempFilePath(file.originalname);

      await fileRepository.put(file.buffer, tempPath);

      const url = await fileRepository.getUrl(tempPath);

      return {
        path: tempPath,
        url,
        type: getTypeFromExtension(file.originalname),
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      };
    })
  );
};
