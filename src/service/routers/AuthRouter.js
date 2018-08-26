const Express = require('express');

const AuthRouter = (dependencies) => {
  const router = Express.Router({ mergeParams: true });
  const { AuthApi } = dependencies;
  router.post('/login', AuthApi.login);
  router.post('/signup', AuthApi.signup);
  router.post('/confirm', AuthApi.confirm);
  router.post('/forgot', AuthApi.forgot);
  router.post('/resend', AuthApi.resend);
  router.post('/confirmForgotPassword', AuthApi.confirmForgotPassword);

  return router;
};

module.exports = AuthRouter;
