const Express = require('express');
const FridgeItemController = require('../controllers/fridge/FridgeItemController');

const FridgeRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const { COMPANY_NAME, FRIDGE_TABLE } = environment;
  const fridgeItemController = new FridgeItemController(
    Logger, DocumentClient, COMPANY_NAME, FRIDGE_TABLE,
  );

  router.post('/item/describe', fridgeItemController.describe);
  router.post('/item/create', fridgeItemController.create);
  router.post('/item/update', fridgeItemController.update);
  router.post('/item/delete', fridgeItemController.delete);
  router.post('/item/list', fridgeItemController.list);

  //  TODO: Dan add the task and log CRUD operations here
  // eg. router.post('/task/describe', FridgeTaskController.describe);
  return router;
};

module.exports = FridgeRouter;
