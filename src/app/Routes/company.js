const Express = require('express');

module.exports = (dependencies) => {
  const router = Express.Router({ mergeParams: true });

  router.post('/DescribeCompany', async (req, res) => {
    try {
      const { body } = req;
      return res.status(200).json({ hello: body });
    } catch (e) {
      const error = dependencies.Utils.parseError(e);
      return res.status(error.errorCode).json(error);
    }
  });

  return router;
};
