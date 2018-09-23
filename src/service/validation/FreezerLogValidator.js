const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const FreezerLogValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.freezerLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      freezerItem: schemas.freezerLog.FREEZER_ITEM,
      temperature: schemas.freezerLog.TEMPERATURE,
      user: schemas.freezerLog.USER,
      image: schemas.freezerLog.IMAGE,
      comments: schemas.freezerLog.COMMENTS,
      signature: schemas.freezerLog.SIGNATURE,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.freezerLog.item.ID,
      freezerItem: schemas.freezerLog.FREEZER_ITEM,
      temperature: schemas.freezerLog.TEMPERATURE,
      user: schemas.freezerLog.USER,
      image: schemas.freezerLog.IMAGE,
      comments: schemas.freezerLog.COMMENTS,
      signature: schemas.freezerLog.SIGNATURE,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.freezerLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.freezerLog.LIMIT,
      from: schemas.freezerLog.FROM,
      paginated: schemas.freezerLog.PAGINATED,
      order: schemas.freezerLog.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = FreezerLogValidator;
