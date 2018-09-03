const shortid = require('shortid');
const FridgeValidator = require('../validation/FridgeValidator');

class FridgeController {
  constructor(Logger, DocumentClient) {
    this.Logger = Logger;
    this.TableName = process.env.FRIDGE_TABLE; //  TODO - inject
    this.DocumentClient = DocumentClient;
    this.Validator = FridgeValidator;
    this.describe = this.describe.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.list = this.list.bind(this);
  }

  async describe(req, res, next) {
    const { Logger, Validator, DocumentClient } = this;
    const { body } = req;
    Logger.info('describe');
    try {
      Validator.validateDescribeRequest(body);
      return res.status(200).json({ hello: 'world' });
    } catch (_err) {
      return next(_err);
    }
  }

  //  TODO - validation and uniquness
  async create(req, res, next) {
    const {
      Logger, Validator, DocumentClient, TableName,
    } = this;
    const { body } = req;
    Logger.info('create');
    try {
      Validator.validateCreateRequest(body);
      const { name } = body;
      const date = Date.now();
      const Item = {
        id: shortid.generate(),
        name,
        createdAt: date,
        updatedAt: date,
      };
      const params = {
        Item,
        TableName,
      };
      const result = await DocumentClient.put(params).promise();
      return res.status(200).json(result);
    } catch (_err) {
      return next(_err);
    }
  }

  async update(req, res, next) {
    const { Logger, Validator, DocumentClient } = this;
    const { body } = req;
    Logger.info('update');
    try {
      Validator.validateUpdateRequest(body);
      return res.status(200).json({ hello: 'world' });
    } catch (_err) {
      return next(_err);
    }
  }

  async delete(req, res, next) {
    const { Logger, Validator, DocumentClient } = this;
    const { body } = req;
    Logger.info('delete');
    try {
      Validator.validateDeleteRequest(body);
      return res.status(200).json({ hello: 'world' });
    } catch (_err) {
      return next(_err);
    }
  }

  async list(req, res, next) {
    const { Logger, Validator, DocumentClient } = this;
    const { body } = req;
    Logger.info('list');
    try {
      Validator.validateListRequest(body);
      return res.status(200).json({ hello: 'world' });
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = FridgeController;
