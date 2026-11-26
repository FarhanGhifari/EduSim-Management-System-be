const {
  S3Client,
  PutObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");
const appErrorHelper = require("../helpers/app-error");
const config = require("../../config/config");
const mime = require("mime-types");
const path = require("path");

const s3 = new S3Client({
  forcePathStyle: config.s3.forcePathStyle,
  region: config.s3.region,
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  },
  endpoint: config.s3.endpoint,
});

const s3Signer = new S3Client({
  forcePathStyle: config.s3.forcePathStyle,
  region: config.s3.region,
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  },
  endpoint: config.s3.s3ProxyHost,
});

const bucketName = config.s3.bucketName;

exports.put = async (file, key) => {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Body: file,
      Key: key,
      ContentType: mime.contentType(path.basename(key)),
    })
  );
};

const deleteFile = async (path) => {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: path,
      })
    );
  } catch (err) {
    console.log("Error deleting file directory", err);
  }
};

exports.delete = deleteFile;

exports.move = async (oldPath, newPath) => {
  try {
    await s3.send(
      new CopyObjectCommand({
        Bucket: bucketName,
        CopySource: `${bucketName}/${oldPath}`,
        Key: newPath,
      })
    );

    await deleteFile(oldPath);
  } catch (err) {
    if (
      err.Code === "NoSuchKey" ||
      err.name === "NoSuchKey" ||
      err.$metadata?.httpStatusCode === 404
    ) {
      throw new appErrorHelper("File tidak valid atau belum diupload", 400);
    } else {
      throw err;
    }
  }
};

exports.isExist = async (path) => {
  try {
    await s3.send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: path,
      })
    );
    return true;
  } catch (error) {
    return false;
  }
};

exports.getUrl = async (path, exipredSecond = 86400) => {
  try {
    return (
      await getSignedUrl(s3Signer, new GetObjectCommand({ Bucket: bucketName, Key: path }), {
        expiresIn: exipredSecond,
      })
    ).replace(config.s3.s3ProxyHost, `${config.s3.s3ProxyHost}${config.s3.s3ProxyPath}`);
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * 
 * @param {string} path 
 * @param {(buffer : Buffer) => string} pipe 
 * @returns 
 */
const getPath = async (path, pipe) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: path,
  });

  const response = await s3.send(command);

  const chunks = [];
  for await (const chunk of response.Body) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  return pipe(buffer);
}

exports.getPath = getPath;

/**
 * 
 * @param {string} path 
 * @param {"base64"|"string"} format 
 */
exports.getFormated = async (path, format) => {
  // formated into base 64
  if(format === "base64")
    return await getPath(path, (buffer) => buffer.toString("base64"));

  // return raw string
  return await getPath(path, (buffer) => buffer.toString());
  }
