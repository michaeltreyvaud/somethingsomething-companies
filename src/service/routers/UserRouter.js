const Express = require('express');
const UserController = require('../controllers/user/UserController');
const TrainingController = require('../controllers/user/TrainingControllerController');
const MedicalController = require('../controllers/user/MedicalControllerController');

const UserRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, SSCognito, DocumentClient } = dependencies;
  const { COMPANY_NAME, SUPPLIER_TABLE } = environment;
  const controller = new UserController(Logger, SSCognito);
  const trainingController = new TrainingController(Logger, DocumentClient, COMPANY_NAME);
  const medicalController = new MedicalController(Logger, DocumentClient, COMPANY_NAME);

  router.post('/update', controller.update);

  router.post('/user/create', trainingController.create);
  router.post('/user/describe', trainingController.describe);
  router.post('/user/update', trainingController.update);
  router.post('/user/delete', trainingController.delete);
  router.post('/user/list', trainingController.list);

  router.post('/user/create', medicalController.create);
  router.post('/user/describe', medicalController.describe);
  router.post('/user/update', medicalController.update);
  router.post('/user/delete', medicalController.delete);
  router.post('/user/list', medicalController.list);

  return router;
};

module.exports = UserRouter;
