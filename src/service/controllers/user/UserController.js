const UserValidator = require('../../validation/UserValidator');

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
      // Validator.validateLoginRequest(body);
      // const { email, password } = body;
      // const response = await Cognito.adminInitiateAuth(email, password);
      return res.status(200).json({ hello: 'wolrd' });
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = UserController;
