const ObjectSchemas = require('../Validation/schemas');
const companyInfrastructure = require('../../../cloudformation/companyInfrastucture.json');

class Company {
  constructor(dependencies) {
    const {
      SSDynamo, SSCloudformation, Validation, Utils,
    } = dependencies;
    this.SSDynamo = SSDynamo;
    this.SSCloudformation = SSCloudformation;
    this.Validation = Validation;
    this.Utils = Utils;
  }

  async get(body) {
    const { SSDynamo, Validation, Utils } = this;
    console.log('Describing Company', body);
    if (!Validation.validate(body, ObjectSchemas.DescribeCompany).valid) {
      throw Utils.validationError();
    }
    const { name } = body;
    console.log('Company Name : ', name);
    const dbParams = {
      TableName: process.env.TABLE_NAME,
      Key: { name },
    };
    try {
      return await SSDynamo.get(dbParams);
    } catch (_err) {
      throw _err;
    }
  }

  async create(body) {
    const {
      SSDynamo, SSCloudformation, Validation, Utils,
    } = this;
    console.log('Creating Company', body);
    if (!Validation.validate(body, ObjectSchemas.CreateCompany).valid) {
      throw Utils.validationError();
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
      await SSDynamo.put(dbParams);
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
      await SSCloudformation.createStack(cfParams);
      return Item;
    } catch (_err) {
      console.log('Error creating company', _err);
      throw _err;
    }
  }

  async update(body) {
    const { SSDynamo, Validation, Utils } = this;
    const params = body;
    console.log('Updating Company', body);
    if (!Validation.validate(params, ObjectSchemas.UpdateCompany).valid) {
      throw Utils.validationError();
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
      return await SSDynamo.update(dbParams);
    } catch (_err) {
      throw _err;
    }
  }

  async delete(body) {
    const { SSDynamo, Validation, Utils } = this;
    console.log('Deleting Company');
    if (!Validation.validate(body, ObjectSchemas.DeleteCompany).valid) {
      throw Utils.validationError();
    }
    const { name } = body;
    console.log('Name : ', name);
    const dbParams = {
      TableName: process.env.TABLE_NAME,
      Key: { name },
    };
    try {
      return await SSDynamo.delete(dbParams);
    } catch (_err) {
      throw _err;
    }
  }
}

exports.Company = Company;
