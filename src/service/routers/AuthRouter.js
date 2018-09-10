const Express = require('express');
const AuthController = require('../controllers/AuthController');

const AuthRouter = (dependencies, environment) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, SSCognito } = dependencies;
  const controller = new AuthController(Logger, SSCognito);

  router.post('/validate', controller.validate);
  router.post('/login', controller.login);
  router.post('/signup', controller.signUp);
  router.post('/forgot', controller.forgot);
  router.post('/confirmNewPassword', controller.confirmNewPassword);
  router.post('/challenge', controller.challenge);

  return router;
};

module.exports = AuthRouter;
