const Express = require('express');
// TO DO
const CleaningItemController = require('../controllers/CleaningItemController');
const CleaningLogController = require('../controllers/CleaningLogController');
const CleaningTaskController = require('../controllers/CleaningTaskController');

const CleaningRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const {
    COMPANY_NAME, CLEANING_TABLE, CLEANING_LOG_TABLE, CLEANING_TASK_TABLE,
  } = environment;
  const cleaningItemController = new CleaningItemController(
    Logger, DocumentClient, COMPANY_NAME, CLEANING_TABLE,
  );
  const cleaningLogController = new CleaningLogController(
    Logger, DocumentClient, COMPANY_NAME, CLEANING_LOG_TABLE,
  );
  const cleaningTaskController = new CleaningTaskController(
    Logger, DocumentClient, COMPANY_NAME, CLEANING_TASK_TABLE,
  );

  router.post('/item/describe', cleaningItemController.describe);
  router.post('/item/create', cleaningItemController.create);
  router.post('/item/update', cleaningItemController.update);
  router.post('/item/delete', cleaningItemController.delete);
  router.post('/item/list', cleaningItemController.list);

  router.post('/log/describe', cleaningLogController.describe);
  router.post('/log/create', cleaningLogController.create);
  router.post('/log/update', cleaningLogController.update);
  router.post('/log/delete', cleaningLogController.delete);
  router.post('/log/list', cleaningLogController.list);

  router.post('/task/describe', cleaningTaskController.describe);
  router.post('/task/create', cleaningTaskController.create);
  router.post('/task/update', cleaningTaskController.update);
  router.post('/task/delete', cleaningTaskController.delete);
  router.post('/task/list', cleaningTaskController.list);

  return router;
};

module.exports = CleaningRouter;
