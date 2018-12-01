const Express = require('express');
const ItemController = require('../controllers/itemController');

const ItemRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, COMPANY_ITEM_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new ItemController(Logger, DocumentClient, COMPANY_NAME, COMPANY_ITEM_TABLE);

  router.post('/:type/describe', controller.describe);
  router.post('/:type/update', controller.update);
  router.post('/:type/list', controller.list);
  router.post('/:type/delete', controller.delete);
  router.post('/:type/create', controller.create);

  return router;
};

module.exports = ItemRouter;
