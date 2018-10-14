const Express = require('express');
// TO DO
const OilItemController = require('../controllers/OilItemController');
const OilLogController = require('../controllers/OilLogController');
const OilTaskController = require('../controllers/OilTaskController');

const OilTestRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const {
    COMPANY_NAME, OIL_TABLE, OIL_TASK_TABLE, OIL_LOG_TABLE,
  } = environment;
  const oilItemController = new OilItemController(
    Logger, DocumentClient, COMPANY_NAME, OIL_TABLE,
  );
  const oilLogController = new OilLogController(
    Logger, DocumentClient, COMPANY_NAME, OIL_LOG_TABLE,
  );
  const oilTaskController = new OilTaskController(
    Logger, DocumentClient, COMPANY_NAME, OIL_TASK_TABLE,
  );

  router.post('/item/describe', oilItemController.describe);
  router.post('/item/create', oilItemController.create);
  router.post('/item/update', oilItemController.update);
  router.post('/item/delete', oilItemController.delete);
  router.post('/item/list', oilItemController.list);

  router.post('/log/describe', oilLogController.describe);
  router.post('/log/create', oilLogController.create);
  router.post('/log/update', oilLogController.update);
  router.post('/log/delete', oilLogController.delete);
  router.post('/log/list', oilLogController.list);

  router.post('/task/describe', oilTaskController.describe);
  router.post('/task/create', oilTaskController.create);
  router.post('/task/update', oilTaskController.update);
  router.post('/task/delete', oilTaskController.delete);
  router.post('/task/list', oilTaskController.list);

  return router;
};

module.exports = OilTestRouter;
