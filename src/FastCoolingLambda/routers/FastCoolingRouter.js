const Express = require('express');
const FastCoolingController = require('../controllers/FastCoolingController');

const FastCoolingRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, FAST_COOLING_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new FastCoolingController(Logger, DocumentClient,
    COMPANY_NAME, FAST_COOLING_TABLE);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);
  router.post('/list', controller.list);
  router.post('/delete', controller.delete);
  router.post('/create', controller.create);

  return router;
};

module.exports = FastCoolingRouter;
