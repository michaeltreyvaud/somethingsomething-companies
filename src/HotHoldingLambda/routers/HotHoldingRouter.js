const Express = require('express');
const HotHoldingController = require('../controllers/HotHoldingController');

const HotHoldingRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, HOT_HOLDING_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new HotHoldingController(Logger, DocumentClient,
    COMPANY_NAME, HOT_HOLDING_TABLE);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);
  router.post('/list', controller.list);
  router.post('/delete', controller.delete);
  router.post('/create', controller.create);

  return router;
};

module.exports = HotHoldingRouter;
