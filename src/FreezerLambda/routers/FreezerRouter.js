const Express = require('express');
const FreezerItemController = require('../controllers/FreezerItemController');
const FreezerLogController = require('../controllers/FreezerLogController');
const FreezerTaskController = require('../controllers/FreezerTaskController');

const FreezerRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const {
    COMPANY_NAME, FREEZER_TABLE, FREEZER_LOG_TABLE, FREEZER_TASK_TABLE,
  } = environment;
  const freezerItemController = new FreezerItemController(
    Logger, DocumentClient, COMPANY_NAME, FREEZER_TABLE,
  );
  const freezerLogController = new FreezerLogController(
    Logger, DocumentClient, COMPANY_NAME, FREEZER_LOG_TABLE,
  );
  const freezerTaskController = new FreezerTaskController(
    Logger, DocumentClient, COMPANY_NAME, FREEZER_TASK_TABLE,
  );

  router.post('/item/describe', freezerItemController.describe);
  router.post('/item/create', freezerItemController.create);
  router.post('/item/update', freezerItemController.update);
  router.post('/item/delete', freezerItemController.delete);
  router.post('/item/list', freezerItemController.list);

  router.post('/log/describe', freezerLogController.describe);
  router.post('/log/create', freezerLogController.create);
  router.post('/log/update', freezerLogController.update);
  router.post('/log/delete', freezerLogController.delete);
  router.post('/log/list', freezerLogController.list);

  router.post('/task/describe', freezerTaskController.describe);
  router.post('/task/create', freezerTaskController.create);
  router.post('/task/update', freezerTaskController.update);
  router.post('/task/delete', freezerTaskController.delete);
  router.post('/task/list', freezerTaskController.list);

  return router;
};

module.exports = FreezerRouter;
