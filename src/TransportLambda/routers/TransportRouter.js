const Express = require('express');
const TransportLocationController = require('../controllers/TransportLocationController');
const TransportLogController = require('../controllers/TransportLogController');

const TransportRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, DocumentClient } = dependencies;
  const {
    COMPANY_NAME, TRANSPORT_LOCATION_TABLE, TRANSPORT_LOG_TABLE,
  } = environment;
  const transportLocationController = new TransportLocationController(
    Logger, DocumentClient, COMPANY_NAME, TRANSPORT_LOCATION_TABLE,
  );
  const transportLogController = new TransportLogController(
    Logger, DocumentClient, COMPANY_NAME, TRANSPORT_LOG_TABLE,
  );

  router.post('/location/describe', transportLocationController.describe);
  router.post('/location/create', transportLocationController.create);
  router.post('/location/update', transportLocationController.update);
  router.post('/location/delete', transportLocationController.delete);
  router.post('/location/list', transportLocationController.list);

  router.post('/log/describe', transportLogController.describe);
  router.post('/log/create', transportLogController.create);
  router.post('/log/update', transportLogController.update);
  router.post('/log/delete', transportLogController.delete);
  router.post('/log/list', transportLogController.list);

  return router;
};

module.exports = TransportRouter;
