const Express = require('express');
const ReportController = require('../controllers/report/ReportController');

const ReportRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_NAME, REPORT_TABLE } = environment;
  const { Logger, DocumentClient } = dependencies;
  const controller = new ReportController(Logger, DocumentClient, COMPANY_NAME, REPORT_TABLE);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);
  router.post('/list', controller.list);
  router.post('/delete', controller.delete);
  router.post('/create', controller.create);

  return router;
};

module.exports = ReportRouter;
