const UserValidator = require('../../validation/User/UserValidator');

class UserController {
  constructor(Logger, Cognito) {
    this.Logger = Logger;
    this.Cognito = Cognito;
    this.Validator = UserValidator;
    this.update = this.update.bind(this);
  }

  async update(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('update');
    try {
      Validator.validateUpdateRequest(body);
      const {
        userName, firstName, lastName, phoneNumber,
      } = body;
      const response = await Cognito.adminUpdateUserAttributes(
        userName, firstName, lastName, phoneNumber,
      );
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = UserController;
