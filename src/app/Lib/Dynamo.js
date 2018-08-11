// eslint-disable-next-line
const AWS = require('aws-sdk');

module.exports = () => {
  const awsDocumentClient = new AWS.DynamoDB.DocumentClient();
  const api = {
    put: _params => new Promise((resolve, reject) => {
      const params = {
        Item: _params.Item,
        TableName: _params.TableName,
        ConditionExpression: _params.ConditionExpression,
        ConditionalOperator: _params.ConditionalOperator,
        Expected: _params.Expected,
        ExpressionAttributeNames: _params.ExpressionAttributeNames,
        ExpressionAttributeValues: _params.ExpressionAttributeValues,
        ReturnConsumedCapacity: _params.ReturnConsumedCapacity,
        ReturnItemCollectionMetrics: _params.ReturnItemCollectionMetrics,
        ReturnValues: _params.ReturnValues,
      };
      return awsDocumentClient.put(params, (_putErr, data) => {
        if (_putErr) {
          console.log('Error creating Endpoint', _putErr);
          return reject(_putErr);
        }
        console.log('Endpoint Created', data);
        return resolve(data);
      });
    }),
    get: _params => new Promise((resolve, reject) => {
      const params = {
        Key: _params.Key,
        TableName: _params.TableName,
        AttributesToGet: _params.AttributesToGet,
        ConsistentRead: _params.ConsistentRead,
        ExpressionAttributeNames: _params.ExpressionAttributeNames,
        ProjectionExpression: _params.ProjectionExpression,
        ReturnConsumedCapacity: _params.ReturnConsumedCapacity,
      };
      return awsDocumentClient.get(params, (_getErr, data) => {
        if (_getErr) {
          console.log('Error getting Link', _getErr);
          return reject(_getErr);
        }
        console.log('Retrieved Item : ', data);
        if (!data.Item) {
          const error = new Error('Endpoint does not exist');
          error.errorCode = 404;
          return reject(error);
        }
        return resolve(data.Item);
      });
    }),
    delete: _params => new Promise((resolve, reject) => {
      const params = {
        Key: _params.Key,
        TableName: _params.TableName,
        ConditionExpression: _params.ConditionExpression,
        ConditionalOperator: _params.ConditionalOperator,
        Expected: _params.Expected,
        ExpressionAttributeNames: _params.ExpressionAttributeNames,
        ExpressionAttributeValues: _params.ExpressionAttributeValues,
        ReturnConsumedCapacity: _params.ReturnConsumedCapacity,
        ReturnItemCollectionMetrics: _params.ReturnItemCollectionMetrics,
        ReturnValues: _params.ReturnValues,
      };
      return awsDocumentClient.delete(params, (_deleteErr) => {
        if (_deleteErr) {
          console.log('Error getting Link', _deleteErr);
          return reject(_deleteErr);
        }
        console.log('Deleted Item');
        return resolve({});
      });
    }),
    update: _params => new Promise((resolve, reject) => {
      const params = {
        Key: _params.Key,
        TableName: _params.TableName,
        AttributeUpdates: _params.AttributeUpdates,
        ConditionExpression: _params.ConditionExpression,
        ConditionalOperator: _params.ConditionalOperator,
        Expected: _params.Expected,
        ExpressionAttributeNames: _params.ExpressionAttributeNames,
        ExpressionAttributeValues: _params.ExpressionAttributeValues,
        ReturnConsumedCapacity: _params.ReturnConsumedCapacity,
        ReturnItemCollectionMetrics: _params.ReturnItemCollectionMetrics,
        ReturnValues: _params.ReturnValues,
        UpdateExpression: _params.UpdateExpression,
      };
      return awsDocumentClient.update(params, (_updateErr, data) => {
        if (_updateErr) {
          console.log('Error updating Endpoint', _updateErr);
          return reject(_updateErr);
        }
        console.log('Updated Endpoint : ', data);
        return resolve(data.Attributes || {});
      });
    }),
    query: (Logger, _params, options) => new Promise((resolve, reject) => {
      const params = {
        TableName: _params.TableName,
        AttributesToGet: _params.AttributesToGet,
        ConditionalOperator: _params.ConditionalOperator,
        ConsistentRead: _params.ConsistentRead,
        ExclusiveStartKey: _params.ExclusiveStartKey,
        ExpressionAttributeNames: _params.ExpressionAttributeNames,
        ExpressionAttributeValues: _params.ExpressionAttributeValues,
        FilterExpression: _params.FilterExpression,
        IndexName: _params.IndexName,
        KeyConditionExpression: _params.KeyConditionExpression,
        KeyConditions: _params.KeyConditions,
        Limit: _params.Limit,
        ProjectionExpression: _params.ProjectionExpression,
        QueryFilter: _params.QueryFilter,
        ReturnConsumedCapacity: _params.ReturnConsumedCapacity,
        ScanIndexForward: _params.ScanIndexForward,
        Select: _params.Select,
      };
      return awsDocumentClient.query(params, (_queryErr, data) => {
        if (_queryErr) {
          Logger.error('Error Getting Links', _queryErr);
          return reject(_queryErr);
        }
        if (options.paginated && data.LastEvaluatedKey) {
          const updateParams = {
            ..._params,
            ExclusiveStartKey: data.LastEvaluatedKey,
          };
          const newData = data;
          return api.query(Logger, updateParams, options)
            .then((nextPage) => {
              newData.Items = newData.Items.concat(nextPage.Items);
              newData.LastEvaluatedKey = nextPage.LastEvaluatedKey;
              return resolve(newData);
            });
        }
        return resolve(data);
      });
    }),
    scan: (Logger, _params, options) => new Promise((resolve, reject) => {
      const params = {
        TableName: _params.TableName,
        AttributesToGet: _params.AttributesToGet,
        ConditionalOperator: _params.ConditionalOperator,
        ConsistentRead: _params.ConsistentRead,
        ExclusiveStartKey: _params.ExclusiveStartKey,
        ExpressionAttributeNames: _params.ExpressionAttributeNames,
        ExpressionAttributeValues: _params.ExpressionAttributeValues,
        FilterExpression: _params.FilterExpression,
        IndexName: _params.IndexName,
        Limit: _params.Limit,
        ProjectionExpression: _params.ProjectionExpression,
        ReturnConsumedCapacity: _params.ReturnConsumedCapacity,
        ScanFilter: _params.ScanFilter,
        Segment: _params.Segment,
        Select: _params.Select,
        TotalSegments: _params.TotalSegments,
      };
      return awsDocumentClient.scan(params, (_scanError, data) => {
        if (_scanError) {
          Logger.error('Error Getting Links', _scanError);
          return reject(_scanError);
        }
        if (options.paginated && data.LastEvaluatedKey) {
          const updateParams = {
            ..._params,
            ExclusiveStartKey: data.LastEvaluatedKey,
          };
          const newData = data;
          return api.scan(Logger, updateParams, options)
            .then((nextPage) => {
              newData.Items = newData.Items.concat(nextPage.Items);
              newData.LastEvaluatedKey = nextPage.LastEvaluatedKey;
              return resolve(newData);
            });
        }
        return resolve(data);
      });
    }),
  };
  return api;
};
