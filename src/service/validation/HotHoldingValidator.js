const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const HotHoldingValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.hotHolding.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      foodItem: schemas.hotHolding.FOOD_ITEM,
      temperature: schemas.hotHolding.TEMPERATURE,
      user: schemas.hotHolding.USER,
      image: schemas.hotHolding.IMAGE,
      comments: schemas.hotHolding.COMMENTS,
      signature: schemas.hotHolding.SIGNATURE,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.hotHolding.ID,
      foodItem: schemas.hotHolding.FOOD_ITEM,
      temperature: schemas.hotHolding.TEMPERATURE,
      user: schemas.hotHolding.USER,
      image: schemas.hotHolding.IMAGE,
      comments: schemas.hotHolding.COMMENTS,
      signature: schemas.hotHolding.SIGNATURE,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.hotHolding.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.fridge.item.LIMIT,
      from: schemas.fridge.item.FROM,
      paginated: schemas.fridge.item.PAGINATED,
      order: schemas.fridge.item.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = HotHoldingValidator;
