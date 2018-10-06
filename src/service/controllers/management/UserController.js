const UserValidator = require('../../validation/UserValidator');

class UserController {
  constructor(Logger, Cognito) {
    this.Logger = Logger;
    this.Cognito = Cognito;
    this.Validator = UserValidator;
    this.create = this.create.bind(this);
    this.describe = this.describe.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.list = this.list.bind(this);
  }

  //  TODO: Validation
  async create(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('create');
    try {
      Validator.validateCreateRequest(body);
      const {
        email, firstName, lastName,
        phoneNumber, position, team,
        authorization,
      } = body;
      const attributes = [{
        Name: 'given_name',
        Value: firstName,
      }, {
        Name: 'family_name',
        Value: lastName,
      }, {
        Name: 'phone_number',
        Value: phoneNumber,
      }, {
        Name: 'custom:position',
        Value: position,
      }, {
        Name: 'custom:team',
        Value: team,
      }, {
        Name: 'custom:authorization',
        Value: authorization,
      }];
      const options = {
        UserAttributes: attributes,
      };
      const response = await Cognito.adminCreateUser(email, options);
      const { User } = response;
      const { Username } = User;
      await Cognito.adminAddUserToGroup(Username, team);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  //  TODO validation
  async describe(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('describe');
    try {
      Validator.validateDescribeRequest(body);
      const { email } = body;
      const response = await Cognito.adminGetUser(email);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  async update(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('update');
    try {
      Validator.validateUpdateRequest(body);
      const {
        userName, firstName, lastName, phoneNumber,
        position, team, authorization,
      } = body;
      await Cognito.adminUpdateAllUserAttributes(
        userName, firstName, lastName, phoneNumber, position, team, authorization,
      );
      const updatedItems = {
        userName,
        firstName,
        lastName,
        phoneNumber,
        position,
        team,
        authorization,
      };
      await Cognito.adminAddUserToGroup(userName, team);
      return res.status(200).json(updatedItems);
    } catch (_err) {
      return next(_err);
    }
  }

  async delete(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('delete');
    try {
      Validator.validateDeleteRequest(body);
      const { userName } = body;
      await Cognito.adminDeleteUser(userName);
      return res.status(200).json({});
    } catch (_err) {
      return next(_err);
    }
  }

  async list(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('list');
    try {
      Validator.validateListRequest(body);
      const response = await Cognito.listUsers();
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = UserController;
