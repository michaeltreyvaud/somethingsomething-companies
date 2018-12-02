const Express = require('express');
const CompanySettingsController = require('../controllers/companySettingsController');

const CompanySettingsRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { COMPANY_SETTINGS_SSM_PARAM } = environment;
  const { Logger, AWS } = dependencies;
  const controller = new CompanySettingsController(Logger, AWS, COMPANY_SETTINGS_SSM_PARAM);

  router.post('/settings/describe', controller.describe);
  router.post('/settings/update', controller.update);

  return router;
};

module.exports = CompanySettingsRouter;
