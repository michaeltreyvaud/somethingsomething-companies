const Express = require('express');
const SupplierListController = require('../controllers/supplierlist/SupplierListController');

const SupplierListRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, SUPPLIER_LIST_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new SupplierListController(Logger, DocumentClient, COMPANY_NAME, SUPPLIER_LIST_TABLE);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);
  router.post('/list', controller.list);
  router.post('/delete', controller.delete);
  router.post('/create', controller.create);

  return router;
};

module.exports = SupplierListRouter;