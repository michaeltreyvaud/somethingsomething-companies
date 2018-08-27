const Express = require('express');
const AuthController = require('../controllers/AuthController');

const AuthRouter = (dependencies) => {
  const router = Express.Router({ mergeParams: true });
  const { Logger, SSCognito } = dependencies;
  const controller = new AuthController(Logger, SSCognito);

  router.post('/login', controller.login);
  router.post('/signup', controller.signUp);
  router.post('/confirm', controller.confirm);
  router.post('/forgot', controller.forgot);
  router.post('/resend', controller.resend);
  router.post('/confirmForgotPassword', controller.confirmForgotPassword);
  router.post('/challenge', controller.challenge);

  return router;
};

module.exports = AuthRouter;
