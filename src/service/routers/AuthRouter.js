const Express = require('express');
const AuthController = require('../controllers/AuthController');

const AuthRouter = (dependencies) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, SSCognito } = dependencies;
  const controller = new AuthController(Logger, SSCognito);

  router.post('/validate', controller.validate);
  router.post('/login', controller.login);
  router.post('/signup', controller.signUp);
  router.post('/forgotPassword', controller.forgotPassword);
  router.post('/confirmNewPassword', controller.confirmNewPassword);
  router.post('/passwordChallenge', controller.passwordChallenge);

  return router;
};

module.exports = AuthRouter;
