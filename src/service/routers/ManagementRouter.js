const Express = require('express');
const UserController = require('../controllers/management/UserController');
const TeamController = require('../controllers/management/TeamController');

const ManagementRouter = (dependencies) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, SSCognito } = dependencies;
  const teamController = new TeamController(Logger, SSCognito);
  const userController = new UserController(Logger, SSCognito);

  router.post('/team/create', teamController.create);
  router.post('/team/describe', teamController.describe);
  router.post('/team/update', teamController.update);
  router.post('/team/delete', teamController.delete);
  router.post('/team/list', teamController.list);

  router.post('/users/create', userController.create);
  router.post('/users/describe', userController.describe);
  router.post('/users/update', userController.update);
  router.post('/users/delete', userController.delete);
  router.post('/users/list', userController.list);

  return router;
};

module.exports = ManagementRouter;
