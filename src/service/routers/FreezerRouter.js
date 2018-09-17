const Express = require('express');
const FreezerItemController = require('../controllers/freezer/FreezerItemController');

const FreezerRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const { COMPANY_NAME, FREEZER_TABLE } = environment;
  const freezerItemController = new FreezerItemController(
    Logger, DocumentClient, COMPANY_NAME, FREEZER_TABLE,
  );

  router.post('/item/describe', freezerItemController.describe);
  router.post('/item/create', freezerItemController.create);
  router.post('/item/update', freezerItemController.update);
  router.post('/item/delete', freezerItemController.delete);
  router.post('/item/list', freezerItemController.list);

  //  TODO: Dan add the task and log CRUD operations here
  // eg. router.post('/task/describe', FreezerTaskController.describe);
  return router;
};

module.exports = FreezerRouter;
