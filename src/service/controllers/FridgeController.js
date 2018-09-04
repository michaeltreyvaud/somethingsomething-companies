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

  //  TODO - validation
  async describe(req, res, next) {
    const {
      Logger, Validator, DocumentClient, TableName,
    } = this;
    const { body } = req;
    Logger.info('describe');
    try {
      Validator.validateDescribeRequest(body);
      const { id } = body;
      const dbParams = {
        TableName,
        Key: { id },
      };
      const response = await DocumentClient.get(dbParams).promise();
      return res.status(200).json(response.Item || {});
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
      await DocumentClient.put(params).promise();
      return res.status(200).json(Item);
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

  //  TODO: Validation
  async delete(req, res, next) {
    const {
      Logger, Validator, DocumentClient, TableName,
    } = this;
    const { body } = req;
    Logger.info('delete');
    try {
      Validator.validateDeleteRequest(body);
      const { id } = body;
      const dbParams = {
        TableName,
        Key: { id },
      };
      await DocumentClient.delete(dbParams).promise();
      return res.status(200).json({});
    } catch (_err) {
      return next(_err);
    }
  }

  //  TODO: Validation will need to update to query at some point
  async list(req, res, next) {
    const {
      Logger, Validator, DocumentClient, TableName,
    } = this;
    const { body } = req;
    Logger.info('list');
    try {
      Validator.validateListRequest(body);
      const { from, limit } = body;
      const dbParams = {
        TableName,
        ExclusiveStartKey: from,
        Limit: limit || 50,
      };
      const scan = async (_params, _options) => {
        Logger.info('Query');
        return DocumentClient.scan(_params).promise().then((_data) => {
          if (_options.paginated && _data.LastEvaluatedKey) {
            const updateParams = {
              ..._params,
              ExclusiveStartKey: _data.LastEvaluatedKey,
            };
            const newData = _data;
            return scan(updateParams, _options)
              .then((nextPage) => {
                newData.Items = newData.Items.concat(nextPage.Items);
                newData.LastEvaluatedKey = nextPage.LastEvaluatedKey;
                newData.Count = nextPage.Count;
                newData.ScannedCount = nextPage.ScannedCount;
                return newData;
              });
          }
          return _data;
        });
      };
      const result = await scan(dbParams, body);
      return res.status(200).json(result);
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = FridgeController;
