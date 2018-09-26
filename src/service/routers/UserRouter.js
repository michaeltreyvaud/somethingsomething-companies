const Express = require('express');
const UserController = require('../controllers/user/UserController');
const TrainingController = require('../controllers/user/TrainingController');
const MedicalController = require('../controllers/user/MedicalController');

const UserRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, SSCognito, DocumentClient } = dependencies;
  const { COMPANY_NAME, USER_TRANING_LOG_TABLE, USER_MEDICAL_LOG_TABLE } = environment;
  const controller = new UserController(Logger, SSCognito);
  const trainingController = new TrainingController(Logger, DocumentClient, COMPANY_NAME, USER_TRANING_LOG_TABLE);
  const medicalController = new MedicalController(Logger, DocumentClient, COMPANY_NAME, USER_MEDICAL_LOG_TABLE);

  router.post('/update', controller.update);

  router.post('/training/create', trainingController.create);
  router.post('/training/describe', trainingController.describe);
  router.post('/training/update', trainingController.update);
  router.post('/training/delete', trainingController.delete);
  router.post('/training/list', trainingController.list);

  router.post('/medical/create', medicalController.create);
  router.post('/medical/describe', medicalController.describe);
  router.post('/medical/update', medicalController.update);
  router.post('/medical/delete', medicalController.delete);
  router.post('/medical/list', medicalController.list);

  return router;
};

module.exports = UserRouter;
