const Express = require('express');
const ServicesController = require('../controllers/ServicesController');

const ServicesRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, SERVICE_LOG_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new ServicesController(Logger, DocumentClient, COMPANY_NAME, SERVICE_LOG_TABLE);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);
  router.post('/list', controller.list);
  router.post('/delete', controller.delete);
  router.post('/create', controller.create);

  return router;
};

module.exports = ServicesRouter;
