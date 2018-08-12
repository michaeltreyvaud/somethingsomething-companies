const Dynamo = require('../Lib/Dynamo')();
const Cloudformation = require('../Lib/Cloudformation')();
const ObjectSchemas = require('./schemas');
const companyInfrastructure = require('../../../cloudformation/companyInfrastucture.json');

module.exports = () => {
  const api = {
    DescribeCompany: async (dependencies, body) => {
      console.log('Describing Company', body);
      if (!dependencies.Validation.validate(body, ObjectSchemas.DescribeCompany).valid) {
        throw dependencies.Utils.validationError();
      }
      const { name } = body;
      console.log('Company Name : ', name);
      const dbParams = {
        TableName: process.env.TABLE_NAME,
        Key: { name },
      };
      try {
        return await Dynamo.get(dbParams);
      } catch (_err) {
        throw _err;
      }
    },
    CreateCompany: async (dependencies, body) => {
      console.log('Creating Company', body);
      if (!dependencies.Validation.validate(body, ObjectSchemas.CreateCompany).valid) {
        throw dependencies.Utils.validationError();
      }
      const {
        name, email, phonenumber, firstname, lastname,
      } = body;
      const date = Date.now();
      const Item = {
        name,
        email,
        phonenumber,
        firstname,
        lastname,
        createdAt: date,
        updatedAt: date,
      };
      const dbParams = {
        TableName: process.env.TABLE_NAME,
        Item,
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        ConditionExpression: 'attribute_not_exists(#name)',
      };
      try {
        await Dynamo.put(dbParams);
        const cfParams = {
          StackName: `${name}Stack`,
          Capabilities: ['CAPABILITY_NAMED_IAM'],
          Parameters: [
            {
              ParameterKey: 'CompanyName',
              ParameterValue: name,
            },
          ],
          //  ResourceTypes: _params.ResourceTypes, - TODO security down the line
          TemplateBody: JSON.stringify(companyInfrastructure),
        };
        await Cloudformation.createStack(cfParams);
        return Item;
      } catch (_err) {
        console.log('Error creating company', _err);
        throw _err;
      }
    },
    UpdateCompany: async (dependencies, body) => {
      const params = body;
      console.log('Updating Company', body);
      if (!dependencies.Validation.validate(params, ObjectSchemas.UpdateCompany).valid) {
        throw dependencies.Utils.validationError();
      }
      const { name } = params;
      console.log('Name : ', name);
      const date = Date.now();
      let updateExpression = 'set ';
      const expressionAttributeNames = {};
      const expressionAttributeValues = {};
      updateExpression = `${updateExpression} #updatedAt = :updatedAt`;
      expressionAttributeNames['#updatedAt'] = 'updatedAt';
      expressionAttributeValues[':updatedAt'] = date;
      expressionAttributeNames['#name'] = 'name';
      delete params.name;
      Object.keys(params).forEach((key) => {
        const attr = `#${key}`;
        const val = `:${key}`;
        updateExpression = `${updateExpression}, ${attr} = ${val}`;
        expressionAttributeNames[attr] = key;
        expressionAttributeValues[val] = params[key];
      });
      const dbParams = {
        TableName: process.env.TABLE_NAME,
        Key: { name },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ConditionExpression: 'attribute_exists(#name)',
        ReturnValues: 'ALL_NEW',
      };
      try {
        return await Dynamo.update(dbParams);
      } catch (_err) {
        throw _err;
      }
    },
    DeleteCompany: async (dependencies, body) => {
      console.log('Deleting Company');
      if (!dependencies.Validation.validate(body, ObjectSchemas.DeleteCompany).valid) {
        throw dependencies.Utils.validationError();
      }
      const { name } = body;
      console.log('Name : ', name);
      const dbParams = {
        TableName: process.env.TABLE_NAME,
        Key: { name },
      };
      try {
        return await Dynamo.delete(dbParams);
      } catch (_err) {
        throw _err;
      }
    },
  };
  return api;
};
