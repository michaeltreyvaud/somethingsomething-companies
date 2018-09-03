const Express = require('express');
const FridgeController = require('../controllers/FridgeController');

const FridgeRouter = (dependencies) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const controller = new FridgeController(Logger, DocumentClient);

  router.post('/describe', controller.describe);
  router.post('/create', controller.create);
  router.post('/update', controller.update);
  router.post('/delete', controller.delete);
  router.post('/list', controller.list);
  return router;
};

module.exports = FridgeRouter;
