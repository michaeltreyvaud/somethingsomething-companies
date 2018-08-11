const Express = require('express');
const Api = require('./api')();

module.exports = (dependencies) => {
  const router = Express.Router({ mergeParams: true });

  router.post('/DescribeCompany', async (req, res) => {
    try {
      const { body } = req;
      const companyDetails = await Api.DescribeCompany(dependencies, body);
      return res.status(200).json(companyDetails);
    } catch (e) {
      const error = dependencies.Utils.parseError(e);
      return res.status(error.errorCode).json(error);
    }
  });

  router.post('/CreateCompany', async (req, res) => {
    try {
      const { body } = req;
      const companyDetails = await Api.CreateCompany(dependencies, body);
      return res.status(200).json(companyDetails);
    } catch (e) {
      const error = dependencies.Utils.parseError(e);
      return res.status(error.errorCode).json(error);
    }
  });

  router.post('/UpdateCompany', async (req, res) => {
    try {
      const { body } = req;
      const endpoint = await Api.UpdateCompany(dependencies, body);
      return res.status(200).json(endpoint);
    } catch (e) {
      const error = dependencies.Utils.parseError(e);
      return res.status(error.errorCode).json(error);
    }
  });

  router.post('/DeleteCompany', async (req, res) => {
    try {
      const { body } = req;
      await Api.DeleteCompany(dependencies, body);
      return res.sendStatus(200);
    } catch (e) {
      const error = dependencies.Utils.parseError(e);
      return res.status(error.errorCode).json(error);
    }
  });

  return router;
};
