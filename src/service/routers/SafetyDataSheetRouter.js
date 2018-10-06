const Express = require('express');
const SafetyDatasheetController = require('../controllers/safetydatasheet/SafetyDatasheetController');

const SafetyDatasheetRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, SAFETY_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new SafetyDatasheetController(Logger, DocumentClient, COMPANY_NAME, SAFETY_TABLE);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);
  router.post('/list', controller.list);
  router.post('/delete', controller.delete);
  router.post('/create', controller.create);

  return router;
};

module.exports = SafetyDatasheetRouter;
