const Express = require('express');
// TO DO
// const FreezerItemController = require('../controllers/cleaning/FreezerItemController');
const CleaningLogController = require('../controllers/cleaning/CleaningLogController');
const CleaningTaskController = require('../controllers/cleaning/CleaningTaskController');

const CleaningRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const {
    COMPANY_NAME, CLEANING_TABLE, CLEANING_LOG_TABLE, CLEANING_TASK_TABLE,
  } = environment;
  // const freezerItemController = new FreezerItemController(
  //   Logger, DocumentClient, COMPANY_NAME, CLEANING_TABLE,
  // );
  const CleaningLogController = new CleaningLogController(
    Logger, DocumentClient, COMPANY_NAME, CLEANING_LOG_TABLE,
  );
  const CleaningTaskController = new CleaningTaskController(
    Logger, DocumentClient, COMPANY_NAME, CLEANING_TASK_TABLE,
  );

  // router.post('/item/describe', freezerItemController.describe);
  // router.post('/item/create', freezerItemController.create);
  // router.post('/item/update', freezerItemController.update);
  // router.post('/item/delete', freezerItemController.delete);
  // router.post('/item/list', freezerItemController.list);

  router.post('/log/describe', CleaningLogController.describe);
  router.post('/log/create', CleaningLogController.create);
  router.post('/log/update', CleaningLogController.update);
  router.post('/log/delete', CleaningLogController.delete);
  router.post('/log/list', CleaningLogController.list);

  router.post('/task/describe', CleaningTaskController.describe);
  router.post('/task/create', CleaningTaskController.create);
  router.post('/task/update', CleaningTaskController.update);
  router.post('/task/delete', CleaningTaskController.delete);
  router.post('/task/list', CleaningTaskController.list);

  return router;
};

module.exports = CleaningRouter;
