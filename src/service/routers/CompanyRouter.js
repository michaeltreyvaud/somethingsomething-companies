const Express = require('express');
const CompanyController = require('../controllers/company/CompanyController');

const AuthRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_SETTINGS_SSM_PARAM } = environment;
  const { Logger, AWS } = dependencies;
  const controller = new CompanyController(Logger, AWS, COMPANY_SETTINGS_SSM_PARAM);

  router.post('/describe', controller.describe);
  router.post('/update', controller.update);

  return router;
};

module.exports = AuthRouter;
