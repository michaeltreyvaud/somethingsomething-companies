const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const OilTestLogValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.OilTestLog.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      oilTestLocation: schemas.OilTestLog.OILTEST_LOCATION,
      oilTestItem: schemas.OilTestLog.OILTEST_ITEM,
      user: schemas.OilTestLog.USER,
      image: schemas.OilTestLog.IMAGE,
      comments: schemas.OilTestLog.COMMENTS,
      signature: schemas.OilTestLog.SIGNATURE,
      status: schemas.OilTestLog.STATUS,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      oilTestLocation: schemas.OilTestLog.OILTEST_LOCATION,
      oilTestItem: schemas.OilTestLog.OILTEST_ITEM,
      user: schemas.OilTestLog.USER,
      image: schemas.OilTestLog.IMAGE,
      comments: schemas.OilTestLog.COMMENTS,
      signature: schemas.OilTestLog.SIGNATURE,
      status: schemas.OilTestLog.STATUS,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.OilTestLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.OilTestLog.LIMIT,
      from: schemas.OilTestLog.FROM,
      paginated: schemas.OilTestLog.PAGINATED,
      order: schemas.OilTestLog.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = OilTestLogValidator;
