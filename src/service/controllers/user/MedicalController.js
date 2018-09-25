const shortid = require('shortid');
const MedicalLogValidator = require('../../validation/User/MedicalLogValidator');

class MedicalLogController {
  constructor(Logger, DocumentClient, CompanyName, TableName) {
    this.Logger = Logger;
    this.CompanyName = CompanyName;
    this.TableName = TableName;
    this.DocumentClient = DocumentClient;
    this.Validator = MedicalLogValidator;
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
      const { createdAt } = body;
      const dbParams = {
        TableName,
        Key: { company: CompanyName, createdAt },
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
        fromDate, toDate, illnessType, certification, details,
      } = body;
      const date = Date.now();
      const Item = {
        company: CompanyName,
        id: shortid.generate(),
        fromDate,
        toDate,
        illnessType,
        certification,
        details,
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
      let updateExpression = 'set ';
      const expressionAttributeNames = {
        '#updatedAt': 'updatedAt',
        '#company': 'company',
        '#id': 'id',
      };
      const expressionAttributeValues = {
        ':updatedAt': date,
        ':company': CompanyName,
      };
      updateExpression = `${updateExpression} #updatedAt = :updatedAt`;
      delete body.id;
      delete body.company;
      delete body.createdAt;
      delete body.updatedAt;
      Object.keys(body).forEach((key) => {
        const attr = `#${key}`;
        const val = `:${key}`;
        updateExpression = `${updateExpression}, ${attr} = ${val}`;
        expressionAttributeNames[attr] = key;
        expressionAttributeValues[val] = body[key];
      });
      const dbParams = {
        TableName,
        Key: { company: CompanyName, createdAt },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ConditionExpression: 'attribute_exists(#id) AND #company = :company',
        ReturnValues: 'ALL_NEW',
      };
      const item = await DocumentClient.update(dbParams).promise();
      return res.status(200).json(item.Attributes || {});
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
      const { createdAt } = body;
      const dbParams = {
        TableName,
        Key: { company: CompanyName, createdAt },
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

module.exports = MedicalLogController;
