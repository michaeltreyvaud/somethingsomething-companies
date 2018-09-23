const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const FridgeLogValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.fridgeLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      fridgeItem: schemas.fridgeLog.FRIDGE_ITEM,
      temperature: schemas.fridgeLog.TEMPERATURE,
      user: schemas.fridgeLog.USER,
      image: schemas.fridgeLog.IMAGE,
      comments: schemas.fridgeLog.COMMENTS,
      signature: schemas.fridgeLog.SIGNATURE,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.fridgeLog.item.ID,
      fridgeItem: schemas.fridgeLog.FRIDGE_ITEM,
      temperature: schemas.fridgeLog.TEMPERATURE,
      user: schemas.fridgeLog.USER,
      image: schemas.fridgeLog.IMAGE,
      comments: schemas.fridgeLog.COMMENTS,
      signature: schemas.fridgeLog.SIGNATURE,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.fridgeLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.fridgeLog.LIMIT,
      from: schemas.fridgeLog.FROM,
      paginated: schemas.fridgeLog.PAGINATED,
      order: schemas.fridgeLog.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = FridgeLogValidator;
