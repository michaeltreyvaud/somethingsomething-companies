const Express = require('express');
const FridgeItemController = require('../controllers/FridgeItemController');
const FridgeLogController = require('../controllers/FridgeLogController');
const FridgeTaskController = require('../controllers/FridgeTaskController');

const FridgeRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const {
    COMPANY_NAME, FRIDGE_TABLE, FRIDGE_LOG_TABLE, FRIDGE_TASK_TABLE,
  } = environment;
  const fridgeItemController = new FridgeItemController(
    Logger, DocumentClient, COMPANY_NAME, FRIDGE_TABLE,
  );
  const fridgeLogController = new FridgeLogController(
    Logger, DocumentClient, COMPANY_NAME, FRIDGE_LOG_TABLE,
  );
  const fridgeTaskController = new FridgeTaskController(
    Logger, DocumentClient, COMPANY_NAME, FRIDGE_TASK_TABLE,
  );

  router.post('/item/describe', fridgeItemController.describe);
  router.post('/item/create', fridgeItemController.create);
  router.post('/item/update', fridgeItemController.update);
  router.post('/item/delete', fridgeItemController.delete);
  router.post('/item/list', fridgeItemController.list);

  router.post('/log/describe', fridgeLogController.describe);
  router.post('/log/create', fridgeLogController.create);
  router.post('/log/update', fridgeLogController.update);
  router.post('/log/delete', fridgeLogController.delete);
  router.post('/log/list', fridgeLogController.list);

  router.post('/task/describe', fridgeTaskController.describe);
  router.post('/task/create', fridgeTaskController.create);
  router.post('/task/update', fridgeTaskController.update);
  router.post('/task/delete', fridgeTaskController.delete);
  router.post('/task/list', fridgeTaskController.list);

  return router;
};

module.exports = FridgeRouter;
