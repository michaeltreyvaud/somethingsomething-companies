const Express = require('express');
//TO DO
//const FreezerItemController = require('../controllers/oiltest/FreezerItemController');
const OilLogController = require('../controllers/oiltest/OilLogController');
const OilTaskController = require('../controllers/oiltest/OilTaskController');

const OilTestRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const {
    COMPANY_NAME, OILTEST_TABLE, OILTEST_LOG_TABLE, OILTEST_TASK_TABLE,
  } = environment;
  // const freezerItemController = new FreezerItemController(
  //   Logger, DocumentClient, COMPANY_NAME, OILTEST_TABLE,
  // );
  const OilLogController = new OilLogController(
    Logger, DocumentClient, COMPANY_NAME, OILTEST_LOG_TABLE,
  );
  const OilTaskController = new OilTaskController(
    Logger, DocumentClient, COMPANY_NAME, OILTEST_TASK_TABLE,
  );

  // router.post('/item/describe', freezerItemController.describe);
  // router.post('/item/create', freezerItemController.create);
  // router.post('/item/update', freezerItemController.update);
  // router.post('/item/delete', freezerItemController.delete);
  // router.post('/item/list', freezerItemController.list);

  router.post('/log/describe', OilLogController.describe);
  router.post('/log/create', OilLogController.create);
  router.post('/log/update', OilLogController.update);
  router.post('/log/delete', OilLogController.delete);
  router.post('/log/list', OilLogController.list);

  router.post('/task/describe', OilTaskController.describe);
  router.post('/task/create', OilTaskController.create);
  router.post('/task/update', OilTaskController.update);
  router.post('/task/delete', OilTaskController.delete);
  router.post('/task/list', OilTaskController.list);

  return router;
};

module.exports = OilTestRouter;
