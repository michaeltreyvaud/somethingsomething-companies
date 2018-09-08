const Express = require('express');
const ManagementController = require('../controllers/ManagementController');

const ManagementRouter = (dependencies) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, SSCognito } = dependencies;
  const controller = new ManagementController(Logger, SSCognito);

  router.post('/team/create', controller.createTeam);
  router.post('/team/describe', controller.describeTeam);
  router.post('/team/update', controller.updateTeam);
  router.post('/team/delete', controller.deleteTeam);
  router.post('/team/list', controller.listTeam);

  return router;
};

module.exports = ManagementRouter;
