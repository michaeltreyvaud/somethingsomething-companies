const ManagementValidator = require('../../validation/ManagementValidator');

class TeamController {
  constructor(Logger, Cognito) {
    this.Logger = Logger;
    this.Cognito = Cognito;
    this.Validator = ManagementValidator;
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
    Logger.info('createTeam');
    try {
      Validator.validateCreateTeamRequest(body);
      const { name, description } = body;
      const response = await Cognito.createGroup(name, description);
      const item = {};
      if (response.Group) {
        const { GroupName, Description } = response.Group;
        item.name = GroupName;
        item.description = Description;
      }
      return res.status(200).json(item);
    } catch (_err) {
      return next(_err);
    }
  }

  //  TODO validation
  async describe(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('describeTeam');
    try {
      Validator.validateDescribeTeamRequest(body);
      const { name } = body;
      const response = await Cognito.getGroup(name);
      const item = {};
      if (response.Group) {
        const { GroupName, Description } = response.Group;
        item.name = GroupName;
        item.description = Description;
      }
      return res.status(200).json(item);
    } catch (_err) {
      return next(_err);
    }
  }

  //  TODO validation
  async update(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('updateTeam');
    try {
      Validator.validateUpdateTeamRequest(body);
      const { name, description } = body;
      const response = await Cognito.updateGroup(name, description);
      const item = {};
      if (response.Group) {
        const { GroupName, Description } = response.Group;
        item.name = GroupName;
        item.description = Description;
      }
      return res.status(200).json(item);
    } catch (_err) {
      return next(_err);
    }
  }

  //  TODO: Validation
  async delete(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('deleteTeam');
    try {
      Validator.validateDeleteTeamRequest(body);
      const { name } = body;
      await Cognito.deleteGroup(name);
      return res.status(200).json({});
    } catch (_err) {
      return next(_err);
    }
  }

  async list(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('listTeam');
    try {
      Validator.validateListTeamRequest(body);
      const response = await Cognito.listGroups();
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = TeamController;
