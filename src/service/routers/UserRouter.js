const Express = require('express');
const UserController = require('../controllers/user/UserController');

const UserRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, SSCognito } = dependencies;
  const controller = new UserController(Logger, SSCognito);

  router.post('/update', controller.update);

  return router;
};

module.exports = UserRouter;
