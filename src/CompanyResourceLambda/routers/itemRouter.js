const Express = require('express');
const ItemController = require('../controllers/itemController');

const ItemRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, COMPANY_ITEM_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new ItemController(Logger, DocumentClient, COMPANY_NAME, COMPANY_ITEM_TABLE);

  router.post('/:type/describe', (req, res, next) => controller.describe(req, res, next));
  router.post('/:type/update', (req, res, next) => controller.update(req, res, next));
  router.post('/:type/list', (req, res, next) => controller.list(req, res, next));
  router.post('/:type/delete', (req, res, next) => controller.delete(req, res, next));
  router.post('/:type/create', (req, res, next) => controller.create(req, res, next));
  router.post('/:type/get', (req, res, next) => controller.get(req, res, next));

  return router;
};

module.exports = ItemRouter;
