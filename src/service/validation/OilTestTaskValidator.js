const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const OilTaskValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.OilTestTask.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      oilTestLocation: schemas.OilTestTask.OILTEST_LOCATION,
      oilTestItem: schemas.OilTestTask.OILTEST_ITEM,
      team: schemas.OilTestTask.TEAM,
      user: schemas.OilTestTask.USER,
      day: schemas.OilTestTask.DAY,
      time: schemas.OilTestTask.TIME,
      description: schemas.OilTestTask.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      oilTestLocation: schemas.OilTestTask.OILTEST_LOCATION,
      oilTestItem: schemas.OilTestTask.OILTEST_ITEM,
      team: schemas.OilTestTask.TEAM,
      user: schemas.OilTestTask.USER,
      day: schemas.OilTestTask.DAY,
      time: schemas.OilTestTask.TIME,
      description: schemas.OilTestTask.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.OilTestTask.ID,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.OilTestTask.LIMIT,
      from: schemas.OilTestTask.FROM,
      paginated: schemas.OilTestTask.PAGINATED,
      order: schemas.OilTestTask.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = OilTaskValidator;
