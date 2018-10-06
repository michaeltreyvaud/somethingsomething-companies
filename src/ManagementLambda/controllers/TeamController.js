const ManagementValidator = require('../validation/ManagementValidator');

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
    this.userlist = this.userlist.bind(this);
    this.userdelete = this.userdelete.bind(this);
  }

  async create(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('create');
    try {
      Validator.validateCreateRequest(body);
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

  async describe(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('describe');
    try {
      Validator.validateDescribeRequest(body);
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

  async update(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('update');
    try {
      Validator.validateUpdateRequest(body);
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

  async delete(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('delete');
    try {
      Validator.validateDeleteRequest(body);
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
    Logger.info('list');
    try {
      Validator.validateListRequest(body);
      const response = await Cognito.listGroups();
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  async userlist(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('userlist');
    try {
      Validator.validateListUsersRequest(body);
      const { name } = body;
      const response = await Cognito.listUsersInGroup(name);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  async userdelete(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('userdelete');
    try {
      Validator.validateUserDeleteRequest(body);
      const { name, userName } = body;
      const response = await Cognito.adminRemoveUserFromGroup(name, userName);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = TeamController;
