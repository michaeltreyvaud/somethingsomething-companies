const shortid = require('shortid');
const SafetyDatasheetValidator = require('../validation/SafetyDatasheetValidator');

class SafetyDatasheetController {
  constructor(Logger, DocumentClient, CompanyName, TableName) {
    this.Logger = Logger;
    this.CompanyName = CompanyName;
    this.TableName = TableName;
    this.DocumentClient = DocumentClient;
    this.Validator = SafetyDatasheetValidator;
    this.describe = this.describe.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.list = this.list.bind(this);
  }

  async describe(req, res, next) {
    const {
      Logger, Validator, DocumentClient, TableName, CompanyName,
    } = this;
    const { body } = req;
    Logger.info('describe');
    try {
      Validator.validateDescribeRequest(body);
      const { id } = body;
      const dbParams = {
        TableName,
        Key: { company: CompanyName, id },
      };
      const response = await DocumentClient.get(dbParams).promise();
      return res.status(200).json(response.Item || {});
    } catch (_err) {
      return next(_err);
    }
  }

  async create(req, res, next) {
    const {
      Logger, Validator, DocumentClient,
      TableName, CompanyName,
    } = this;
    const { body } = req;
    Logger.info('create');
    try {
      Validator.validateCreateRequest(body);
      const {
        user, title, file, signature, comments,
      } = body;
      const date = Date.now();
      const Item = {
        company: CompanyName,
        id: shortid.generate(),
        user,
        title,
        file,
        signature,
        comments,
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
    const {
      Logger, Validator, DocumentClient,
      TableName, CompanyName,
    } = this;
    const { body } = req;
    Logger.info('update');
    try {
      Validator.validateUpdateRequest(body);
      const { createdAt } = body;
      const date = Date.now();
      const getParams = {
        TableName,
        Key: { company: CompanyName, createdAt },
      };
      const currentData = await DocumentClient.get(getParams).promise();
      const { Item: oldItem } = currentData;
      const Item = {
        ...oldItem,
        ...body,
        updatedAt: date,
      };
      const putParams = { Item, TableName };
      await DocumentClient.put(putParams).promise();
      return res.status(200).json(Item);
    } catch (_err) {
      return next(_err);
    }
  }

  async delete(req, res, next) {
    const {
      Logger, Validator, DocumentClient,
      TableName, CompanyName,
    } = this;
    const { body } = req;
    Logger.info('delete');
    try {
      Validator.validateDeleteRequest(body);
      const { id } = body;
      const dbParams = {
        TableName,
        Key: { company: CompanyName, id },
      };
      await DocumentClient.delete(dbParams).promise();
      return res.status(200).json({});
    } catch (_err) {
      return next(_err);
    }
  }

  async list(req, res, next) {
    const {
      Logger, Validator, DocumentClient,
      TableName, CompanyName,
    } = this;
    const { body } = req;
    Logger.info('list');
    try {
      Validator.validateListRequest(body);
      const { from, limit, order } = body;
      const dbParams = {
        TableName,
        // IndexName: 'byName',
        ExclusiveStartKey: from,
        Limit: limit || 50,
        KeyConditionExpression: '#company = :company',
        ExpressionAttributeNames: {
          '#company': 'company',
        },
        ExpressionAttributeValues: {
          ':company': CompanyName,
        },
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
            const updateParams = {
              ..._params,
              ExclusiveStartKey: _data.LastEvaluatedKey,
            };
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

module.exports = SafetyDatasheetController;
