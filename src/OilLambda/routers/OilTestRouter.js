const Express = require('express');
// TO DO
// const FreezerItemController = require('../controllers/oiltest/FreezerItemController');
const OilLogController = require('../controllers/OilLogController');
const OilTaskController = require('../controllers/OilTaskController');

const OilTestRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const {
    COMPANY_NAME, OIL_TABLE, OIL_TASK_TABLE, OIL_LOG_TABLE,
  } = environment;
  // const freezerItemController = new FreezerItemController(
  //   Logger, DocumentClient, COMPANY_NAME, OILTEST_TABLE,
  // );
  const oilLogController = new OilLogController(
    Logger, DocumentClient, COMPANY_NAME, OIL_LOG_TABLE,
  );
  const oilTaskController = new OilTaskController(
    Logger, DocumentClient, COMPANY_NAME, OIL_TASK_TABLE,
  );

  // router.post('/item/describe', freezerItemController.describe);
  // router.post('/item/create', freezerItemController.create);
  // router.post('/item/update', freezerItemController.update);
  // router.post('/item/delete', freezerItemController.delete);
  // router.post('/item/list', freezerItemController.list);

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
