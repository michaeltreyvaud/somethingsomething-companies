const Express = require('express');
const DeliveryItemRouter = require('../controllers/DeliveryItemRouter');

const DeliveryItemRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, DELIVERY_ITEM_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new DeliveryItemRouter(Logger, DocumentClient, COMPANY_NAME, DELIVERY_ITEM_TABLE);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);
  router.post('/list', controller.list);
  router.post('/delete', controller.delete);
  router.post('/create', controller.create);

  return router;
};

module.exports = DeliveryItemRouter;