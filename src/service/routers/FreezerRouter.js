const Express = require('express');
const FreezerController = require('../controllers/FreezerController');

const FreezerRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const { COMPANY_NAME, FREEZER_TABLE } = environment;
  const controller = new FreezerController(Logger, DocumentClient, COMPANY_NAME, FREEZER_TABLE);

  router.post('/describe', controller.describe);
  router.post('/create', controller.create);
  router.post('/update', controller.update);
  router.post('/delete', controller.delete);
  router.post('/list', controller.list);
  return router;
};

module.exports = FreezerRouter;
