const Express = require('express');
const CompanyApi = require('../../app/Api/Company');

const CompanyRouter = (dependencies) => {
  this.router = Express.Router({ mergeParams: true });
  this.Company = new CompanyApi.Company(dependencies);
  const { router, Company } = this;
  router.post('/DescribeCompany', async (req, res) => {
    try {
      const { body } = req;
      const companyDetails = await Company.get(body);
      return res.status(200).json(companyDetails);
    } catch (e) {
      const error = dependencies.Utils.parseError(e);
      return res.status(error.errorCode).json(error);
    }
  });

  router.post('/CreateCompany', async (req, res) => {
    try {
      const { body } = req;
      const companyDetails = await Company.create(body);
      return res.status(200).json(companyDetails);
    } catch (e) {
      const error = dependencies.Utils.parseError(e);
      return res.status(error.errorCode).json(error);
    }
  });

  router.post('/UpdateCompany', async (req, res) => {
    try {
      const { body } = req;
      const endpoint = await Company.update(body);
      return res.status(200).json(endpoint);
    } catch (e) {
      const error = dependencies.Utils.parseError(e);
      return res.status(error.errorCode).json(error);
    }
  });

  router.post('/DeleteCompany', async (req, res) => {
    try {
      const { body } = req;
      await Company.delete(body);
      return res.sendStatus(200);
    } catch (e) {
      const error = dependencies.Utils.parseError(e);
      return res.status(error.errorCode).json(error);
    }
  });

  return router;
};

module.exports = CompanyRouter;
