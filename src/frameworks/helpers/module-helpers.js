const path = require("path");
const AppError = require("./app-error");
const config = require("../../config/config");

const filesystem = config.filesystem || process.env.FILESYSTEM || "local";
const fileRepository = require(`../filesystem/${filesystem}`);

const getTypeFromExtension = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    ".pdf": "PDF",
    ".mp4": "VIDEO", ".mov": "VIDEO", ".avi": "VIDEO", ".mkv": "VIDEO", ".webm": "VIDEO",
    ".jpg": "IMAGE", ".jpeg": "IMAGE", ".png": "IMAGE", ".gif": "IMAGE", ".webp": "IMAGE",
    ".doc": "DOCUMENT", ".docx": "DOCUMENT", ".ppt": "DOCUMENT", ".pptx": "DOCUMENT", ".xls": "DOCUMENT", ".xlsx": "DOCUMENT",
  };
  return map[ext] || "OTHER";
};

const checkParentId = async (repository, parentId) => {
  if (parentId === null || parentId === undefined) return;

  const parent = await repository.show(parentId);

  if (!parent) throw new AppError("Parent ID not found", 422);
};

module.exports = {
  fileRepository,
  getTypeFromExtension,
  checkParentId,
};
