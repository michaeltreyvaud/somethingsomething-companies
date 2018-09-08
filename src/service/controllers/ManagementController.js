const AuthValidator = require('../validation/ManagementValidator');

class ManagementController {
  constructor(Logger, Cognito) {
    this.Logger = Logger;
    this.Cognito = Cognito;
    this.Validator = AuthValidator;
    this.createTeam = this.createTeam.bind(this);
    this.describeTeam = this.describeTeam.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.listTeam = this.listTeam.bind(this);
  }

  //  TODO: Validation
  async createTeam(req, res, next) {
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
  async describeTeam(req, res, next) {
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
  async updateTeam(req, res, next) {
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
  async deleteTeam(req, res, next) {
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

  async listTeam(req, res, next) {
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

module.exports = ManagementController;
