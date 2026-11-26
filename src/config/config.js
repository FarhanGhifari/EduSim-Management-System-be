require("dotenv").config();

const config = {
  gitlab: {
    GITLAB_TOKEN: process.env.GITLAB_TOKEN || "",
    GITLAB_PROJECT_ID: process.env.GITLAB_PROJECT_ID || "",
    GITLAB_URL: process.env.GITLAB_URL || ""
  },
  bot: {
    WA_BOT_URL: process.env.WA_BOT_URL || "",
    WA_GROUP_NAME: process.env.WA_GROUP_NAME || "",
    WA_MENTION_ID: process.env.WA_MENTION_ID || "",
    WA_MENTION_TEXT: process.env.WA_MENTION_TEXT || ""
  },
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  appUrl: process.env.APP_URL || "http://localhost:3000",
  database: {
    host: process.env.DB_HOST || "127.0.0.1",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    dbname: process.env.DB_NAME || "",
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
  },
  redis: {
    uri: process.env.REDIS_URL || "redis://localhost:6379",
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || "6379",
  },
  rabbitmq: {
    host: process.env.RABBITMQ_HOST || "amqp://localhost",
    exchange: process.env.RABBITMQ_EXCHANGE || "queue",
    notification_exchange: process.env.NOTIFICATION_EXCHANGE || "queue",
    alumnus_exchange: process.env.ALUMNUS_EXCHANGE || "queue",
    assessment_exchange: process.env.ASSESSMENT_EXCHANGE || "queue",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "default_secret_key",
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  },
  filesystem: process.env.FILESYSTEM || "local",
  s3: {
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
    region: process.env.S3_REGION || "us-east-1",
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    endpoint: process.env.S3_ENDPOINT || "",
    s3ProxyHost: process.env.S3_PROXY_HOST || process.env.S3_ENDPOINT || "",
    s3ProxyPath: process.env.S3_PROXY_PATH || "",
    bucketName: process.env.S3_BUCKET_NAME || "",
  },
};

module.exports = config;
