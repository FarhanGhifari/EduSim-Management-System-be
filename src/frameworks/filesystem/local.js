const fs = require("fs");
const appErrorHelper = require("../helpers/app-error");
const config = require("../../config/config");
const getDirName = require("path").dirname;

const storageDir = "storage";

async function makeDir(path) {
  await fs.promises.mkdir(getDirName(path), { recursive: true });
}

exports.put = async (file, key) => {
  await makeDir(`${storageDir}/${key}`);
  await fs.promises.writeFile(`${storageDir}/${key}`, file);
};

exports.move = async (oldPath, newPath) => {
  try {
    await makeDir(`${storageDir}/${newPath}`);
    await fs.promises.rename(
      `${storageDir}/${oldPath}`,
      `${storageDir}/${newPath}`
    );
  } catch (err) {
    throw new appErrorHelper("File tidak valid atau belum diupload", 400);
  }
};

exports.delete = async (path) => {
  try {
    await fs.promises.unlink(`${storageDir}/${path}`);
  } catch (err) {
    console.log(err);
  }
};

exports.getUrl = async (path) => {
  return config.appUrl + "/" + storageDir + "/" + path;
};

exports.isExist = async (path) => {
  try {
    return fs.existsSync(`${storageDir}/${path}`);
  } catch (error) {
    return false;
  }
};

exports.existsSync = async (path) => {
  try {
    return fs.existsSync(path);
  } catch (error) {
    console.log(error);
    throw new appErrorHelper(error, 400);
  }
};
