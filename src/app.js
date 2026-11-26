require("dotenv").config();
const config = require("./config/config");
const express = require("express");
const routes = require("./frameworks/webserver/routes/routes");
const server = require("./frameworks/webserver/server");
const postgresConnection = require("./frameworks/database/postgres/connection");
const expressConfig = require("./frameworks/webserver/express");
// const rabbitmqConnection = require("./frameworks/webserver/rabbitmq");
// const RabbitMqRepository = require("./frameworks/rabbitmq/repositories/rabbitmq-repository");
// const redisRepository = require("./frameworks/database/redis/repositories/redis-repository");
// const redis = require("./frameworks/webserver/redis");
const errorHandler = require("./frameworks/webserver/middleware/error-handler");

(async () => {
  // let redis = require("./frameworks/webserver/redis");

  // DEFINE EXPRESS
  const app = express();

  expressConfig(app);

  // //REDIS
  // let redisConnection = await redis.startServer();

  // //RABBIT
  // const mqConnection = rabbitmqConnection(config);

  // RUN SEQUELIZE
  const sequelize = postgresConnection(config);

  // HELPERS
  /*===================================================IMPORT========================================================== */
  // MODEL
  const user = require("./frameworks/database/postgres/models/users");
  const userDetails = require("./frameworks/database/postgres/models/user-details");
  const role = require("./frameworks/database/postgres/models/roles");
  const permission = require("./frameworks/database/postgres/models/permissions");
  const usersRoleLink = require("./frameworks/database/postgres/models/users-role-links");
  const permissionsRoleLink = require("./frameworks/database/postgres/models/permissions-role-links");
  const moduleModel = require("./frameworks/database/postgres/models/modules");
  const learningMaterial = require("./frameworks/database/postgres/models/learning-materials");
  const asset = require("./frameworks/database/postgres/models/assets");
  const learningMaterialAssetLink = require("./frameworks/database/postgres/models/learning-materials-assets-links");
  const questionModel = require("./frameworks/database/postgres/models/questions");
  const questionOptionModel = require("./frameworks/database/postgres/models/question-options");
  const scheduleModel = require("./frameworks/database/postgres/models/schedules");
  const scheduleQuestionModel = require("./frameworks/database/postgres/models/schedule-questions");
  const testAttemptModel = require("./frameworks/database/postgres/models/test-attempts");
  const attemptDetailsModel = require("./frameworks/database/postgres/models/attempt-details");
  const objectListModel = require("./frameworks/database/postgres/models/object-list");
  const logModel = require("./frameworks/database/postgres/models/logs");
  const stepResultModel = require("./frameworks/database/postgres/models/step-results");
  const reportModel = require("./frameworks/database/postgres/models/reports");
  const classModel = require("./frameworks/database/postgres/models/classes");

  // REPOSITORY
  const userRepository = require("./frameworks/database/postgres/repositories/user-repository");
  const roleRepository = require("./frameworks/database/postgres/repositories/role-repository");
  const dashboardRepository = require("./frameworks/database/postgres/repositories/dashboard-repository");
  const moduleRepository = require("./frameworks/database/postgres/repositories/module-repository");
  const questionRepository = require("./frameworks/database/postgres/repositories/question-repository");
  const scheduleRepository = require("./frameworks/database/postgres/repositories/schedule-repository");
  const classRepository = require("./frameworks/database/postgres/repositories/class-repository");

  // USE CASE
  const authUseCases = require("./application/use_cases/authentication/index");
  const userUseCases = require("./application/use_cases/user/index");
  const profileUseCases = require("./application/use_cases/profile/index");
  const dashboardUseCases = require("./application/use_cases/dashboard/index");
  const moduleUseCases = require("./application/use_cases/module/index");
  const questionUseCases = require("./application/use_cases/question/index");
  const testUseCases = require("./application/use_cases/test/index");
  const classUseCases = require("./application/use_cases/class/index");
  // EVENT
  // todo: buat rabbit event
  // const events = require("./adapters/event/index");

  // CONTROLLER
  const userController = require("./adapters/controllers/user-controller");
  const authController = require("./adapters/controllers/auth-controller");
  const profileController = require("./adapters/controllers/profile-controller");
  const dashboardController = require("./adapters/controllers/dashboard-controller");
  const moduleController = require("./adapters/controllers/module-controller");
  const questionController = require("./adapters/controllers/question-controller");
  const testController = require("./adapters/controllers/test-controller");
  const classController = require("./adapters/controllers/class-controller");

  /*===================================================DEFINE========================================================== */
  // MODELS
  const models = {
    // project: project(sequelize),
    user: user(sequelize),
    userDetails: userDetails(sequelize),
    role: role(sequelize),
    permission: permission(sequelize),
    usersRoleLink: usersRoleLink(sequelize),
    permissionsRoleLink: permissionsRoleLink(sequelize),
    module: moduleModel(sequelize),
    learningMaterial: learningMaterial(sequelize),
    asset: asset(sequelize),
    learningMaterialAssetLink: learningMaterialAssetLink(sequelize),
    question: questionModel(sequelize),
    questionOption: questionOptionModel(sequelize),
    schedule: scheduleModel(sequelize),
    scheduleQuestion: scheduleQuestionModel(sequelize),
    testAttempt: testAttemptModel(sequelize),
    attemptDetails: attemptDetailsModel(sequelize),
    objectList: objectListModel(sequelize),
    log: logModel(sequelize),
    stepResult: stepResultModel(sequelize),
    report: reportModel(sequelize),
    class: classModel(sequelize),
    // task: task(sequelize)
  };

  // ASSOCIATIONS
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  // REPOSITORIES
  const repositories = {
    // rabbitMqRepo: await RabbitMqRepository(mqConnection),
    // redisRepository: redisRepository(redisConnection),
    userRepository: userRepository(models),
    roleRepository: roleRepository(models),
    dashboardRepository: dashboardRepository(models),
    moduleRepository: moduleRepository(models),
    questionRepository: questionRepository(models),
    scheduleRepository: scheduleRepository(models),
    classRepository: classRepository(models),
  };

  // USE CASES
  const useCase = {
    authUseCase: authUseCases(repositories),
    userUseCase: userUseCases(repositories),
    profileUseCase: profileUseCases(repositories),
    dashboardUseCase: dashboardUseCases(repositories),
    moduleUseCase: moduleUseCases(repositories),
    questionUseCase: questionUseCases(repositories),
    testUseCase: testUseCases(repositories),
    classUseCase: classUseCases(repositories),
  };

  // EVENTS
  // await events(repositories, useCases);

  // CONTROLLERS
  const controllers = {
    // projectController: projectController(repositories),
    // taskController: taskController(repositories),
    userController: userController(useCase),
    authController: authController(useCase),
    profileController: profileController(useCase),
    dashboardController: dashboardController(useCase),
    moduleController: moduleController(useCase),
    questionController: questionController(useCase),
    testController: testController(useCase),
    classController: classController(useCase),
  };

  // DEFINE ROUTES
  routes(app, controllers, repositories);

  // ERROR HANDLER
  app.use(errorHandler);

  // RUN SERVER
  server(app);
})();
