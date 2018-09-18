const Express = require('express');
const UserController = require('../controllers/management/UserController');
const TeamController = require('../controllers/management/TeamController');
const SupplierListController = require('../controllers/management/SupplierListController');

const ManagementRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, SSCognito, DocumentClient } = dependencies;
  const { COMPANY_NAME, SUPPLIER_TABLE } = environment;
  const teamController = new TeamController(Logger, SSCognito);
  const userController = new UserController(Logger, SSCognito);
  const supplierListController = new SupplierListController(Logger, DocumentClient,
    COMPANY_NAME, SUPPLIER_TABLE);

  router.post('/team/create', teamController.create);
  router.post('/team/describe', teamController.describe);
  router.post('/team/update', teamController.update);
  router.post('/team/delete', teamController.delete);
  router.post('/team/list', teamController.list);
  router.post('/team/users', teamController.users);

  router.post('/user/create', userController.create);
  router.post('/user/describe', userController.describe);
  router.post('/user/update', userController.update);
  router.post('/user/delete', userController.delete);
  router.post('/user/list', userController.list);

  router.post('/supplier/create', supplierListController.create);
  router.post('/supplier/describe', supplierListController.describe);
  router.post('/supplier/update', supplierListController.update);
  router.post('/supplier/delete', supplierListController.delete);
  router.post('/supplier/list', supplierListController.list);

  return router;
};

module.exports = ManagementRouter;
