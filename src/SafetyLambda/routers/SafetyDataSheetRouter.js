const Express = require('express');
const SafetyDatasheetController = require('../controllers/SafetyDatasheetController');
const SafetyLogController = require('../controllers/SafetyLogController');
const SafetyTaskController = require('../controllers/SafetyTaskController');
const SafetyCategoryController = require('../controllers/SafetyCategoryController');

const SafetyDatasheetRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const {
    COMPANY_NAME, SAFETY_TABLE, SAFETY_TASK_TABLE, SAFETY_LOG_TABLE, SAFETY_CATEGORY_TABLE,
  } = environment;
  const { Logger, DocumentClient } = dependencies;
  const safetyController = new SafetyDatasheetController(
    Logger, DocumentClient,
    COMPANY_NAME, SAFETY_TABLE,
  );
  const safetyLogController = new SafetyLogController(
    Logger, DocumentClient,
    COMPANY_NAME, SAFETY_LOG_TABLE,
  );
  const safetyTaskController = new SafetyTaskController(
    Logger, DocumentClient,
    COMPANY_NAME, SAFETY_TASK_TABLE,
  );
  const safetyCategoryController = new SafetyCategoryController(
    Logger, DocumentClient,
    COMPANY_NAME, SAFETY_CATEGORY_TABLE,
  );

  router.post('/describe', safetyController.describe);
  router.post('/update', safetyController.update);
  router.post('/list', safetyController.list);
  router.post('/delete', safetyController.delete);
  router.post('/create', safetyController.create);

  router.post('/log/describe', safetyLogController.describe);
  router.post('/log/update', safetyLogController.update);
  router.post('/log/list', safetyLogController.list);
  router.post('/log/delete', safetyLogController.delete);
  router.post('/log/create', safetyLogController.create);

  router.post('/task/describe', safetyTaskController.describe);
  router.post('/task/update', safetyTaskController.update);
  router.post('/task/list', safetyTaskController.list);
  router.post('/task/delete', safetyTaskController.delete);
  router.post('/task/create', safetyTaskController.create);

  router.post('/category/describe', safetyCategoryController.describe);
  router.post('/category/update', safetyCategoryController.update);
  router.post('/category/list', safetyCategoryController.list);
  router.post('/category/delete', safetyCategoryController.delete);
  router.post('/category/create', safetyCategoryController.create);

  return router;
};

module.exports = SafetyDatasheetRouter;
