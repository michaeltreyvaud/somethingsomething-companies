const shortid = require('shortid');
//  TODO - fix validation
//const HotHoldingValidator = require('../validation/HotHoldingValidator');

class ItemController {
  constructor(Logger, DocumentClient, CompanyName, TableName) {
    this.Logger = Logger;
    this.CompanyName = CompanyName;
    this.TableName = TableName;
    this.DocumentClient = DocumentClient;
    // this.Validator = HotHoldingValidator;
    this.describe = this.describe.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.list = this.list.bind(this);
  }

  async describe(req, res, next) {
    const { Logger, DocumentClient, TableName } = this;
    const { body, params } = req;
    const { type } = params;
    Logger.info(`describe ${type}`);
    try {
      //Validator.validateDescribeRequest(body);
      const { createdAt } = body;
      const dbParams = { TableName, Key: { type, createdAt } };
      const response = await DocumentClient.get(dbParams).promise();
      return res.status(200).json(response.Item || {});
    } catch (_err) {
      return next(_err);
    }
  }

  async create(req, res, next) {
    const { Logger, DocumentClient, TableName } = this;
    const { body, params } = req;
    const { type } = params;
    Logger.info(`create ${type}`);
    try {
      //  Validator.validateCreateRequest(body);
      const date = Date.now();
      const Item = {
        type,
        id: shortid.generate(),
        ...body,
        createdAt: date,
        updatedAt: date,
      };
      const dbParams = { Item, TableName };
      await DocumentClient.put(dbParams).promise();
      return res.status(200).json(Item);
    } catch (_err) {
      return next(_err);
    }
  }

  async update(req, res, next) {
    const { Logger, DocumentClient, TableName } = this;
    const { body, params } = req;
    const { type } = params;
    Logger.info(`update ${type}`);
    try {
      //Validator.validateUpdateRequest(body);
      const { createdAt } = body;
      const date = Date.now();
      const getParams = { TableName, Key: { type, createdAt } };
      const currentData = await DocumentClient.get(getParams).promise();
      const { Item: oldItem } = currentData;
      const Item = { ...oldItem, ...body, updatedAt: date };
      const putParams = { Item, TableName };
      await DocumentClient.put(putParams).promise();
      return res.status(200).json(Item);
    } catch (_err) {
      return next(_err);
    }
  }

  async delete(req, res, next) {
    const { Logger, DocumentClient, TableName } = this;
    const { body, params } = req;
    const { type } = params;
    Logger.info(`delete ${type}`);
    try {
      //Validator.validateDeleteRequest(body);
      const { createdAt } = body;
      const dbParams = { TableName, Key: { type, createdAt } };
      await DocumentClient.delete(dbParams).promise();
      return res.status(200).json({});
    } catch (_err) {
      return next(_err);
    }
  }

  async list(req, res, next) {
    const { Logger, DocumentClient, TableName } = this;
    const { body, params } = req;
    const { type } = params;
    Logger.info(`list ${type}`);
    try {
      //  Validator.validateListRequest(body);
      const { from, limit, order } = body;
      const dbParams = {
        TableName,
        ExclusiveStartKey: from,
        Limit: limit || 50,
        KeyConditionExpression: '#type = :type',
        ExpressionAttributeNames: { '#type': 'type' },
        ExpressionAttributeValues: { ':type': type },
        ScanIndexForward: false,
      };
      if (order) {
        const forward = (order === 'asc');
        dbParams.ScanIndexForward = forward;
      }
      const query = async (_params, _options) => {
        Logger.info('Query');
        return DocumentClient.query(_params).promise().then((_data) => {
          if (_options.paginated && _data.LastEvaluatedKey) {
            const updateParams = { ..._params, ExclusiveStartKey: _data.LastEvaluatedKey };
            const newData = _data;
            return query(updateParams, _options)
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
      const result = await query(dbParams, body);
      return res.status(200).json(result);
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = ItemController;
