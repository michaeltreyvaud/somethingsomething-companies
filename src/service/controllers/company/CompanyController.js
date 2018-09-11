const CompanyValidator = require('../../validation/CompanyValidator');

class CompanyController {
  constructor(Logger, AWS, SSMParam) {
    this.Logger = Logger;
    this.SSM = new AWS.SSM();
    this.Validator = CompanyValidator;
    this.SSMParam = SSMParam;
    this.describe = this.describe.bind(this);
    this.update = this.update.bind(this);
  }

  async describe(req, res, next) {
    const {
      Logger, SSM, Validator, SSMParam,
    } = this;
    const { body } = req;
    Logger.info('describe');
    try {
      Validator.validateDescribeRequest(body);
      const params = { Name: SSMParam };
      return SSM.getParameter(params).promise().then((data) => {
        const item = JSON.parse(data.Parameter.Value);
        return res.status(200).json(item);
      });
    } catch (_err) {
      return next(_err);
    }
  }

  async update(req, res, next) {
    const {
      Logger, SSM, Validator, SSMParam,
    } = this;
    const { body } = req;
    Logger.info('update');
    try {
      Validator.validateUpdateRequest(body);
      const Value = JSON.stringify(body);
      const params = {
        Name: SSMParam,
        Type: 'String',
        Value,
        Overwrite: true,
      };
      return SSM.putParameter(params).promise().then(() => res.status(200).json({}));
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = CompanyController;
