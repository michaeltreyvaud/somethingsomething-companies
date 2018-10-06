const Express = require('express');
const PestManagementController = require('../controllers/PestManagementController');

const PestManagementRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, PEST_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new PestManagementController(Logger, DocumentClient, COMPANY_NAME, PEST_TABLE);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);
  router.post('/list', controller.list);
  router.post('/delete', controller.delete);
  router.post('/create', controller.create);

  return router;
};

module.exports = PestManagementRouter;
