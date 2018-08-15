class SSDynamo {
  constructor(AWS) {
    this.DocumentClient = new AWS.DynamoDB.DocumentClient();
  }

  async put(_params) {
    const { DocumentClient } = this;
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
    return DocumentClient.put(params).promise().then((_data) => {
      console.log('Put Success : ', _data);
      return _data;
    }).catch((_putErr) => {
      console.log('Put Fail : ', _putErr);
      throw _putErr;
    });
  }

  async get(_params) {
    const { DocumentClient } = this;
    const params = {
      Key: _params.Key,
      TableName: _params.TableName,
      AttributesToGet: _params.AttributesToGet,
      ConsistentRead: _params.ConsistentRead,
      ExpressionAttributeNames: _params.ExpressionAttributeNames,
      ProjectionExpression: _params.ProjectionExpression,
      ReturnConsumedCapacity: _params.ReturnConsumedCapacity,
    };
    return DocumentClient.get(params).promise().then((_data) => {
      console.log('Get Success : ', _data);
      return _data;
    }).catch((_getError) => {
      console.log('Get Fail : ', _getError);
      throw _getError;
    });
  }

  async delete(_params) {
    const { DocumentClient } = this;
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
    return DocumentClient.delete(params).promise().then(() => {
      console.log('Delete Success');
      return {};
    }).catch((_deleteErr) => {
      console.log('Delete Fail : ', _deleteErr);
      throw _deleteErr;
    });
  }

  async update(_params) {
    const { DocumentClient } = this;
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
    return DocumentClient.update(params).promise().then((_data) => {
      console.log('Update Success : ', _data);
      return _data.Attributes || {};
    }).catch((_updateErr) => {
      console.log('Update Fail : ', _updateErr);
      throw _updateErr;
    });
  }
}

exports.SSDynamo = SSDynamo;
