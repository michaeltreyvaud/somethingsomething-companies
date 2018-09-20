const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const FridgeTaskValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.fridgeTask.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      fridgeItem: schemas.fridgeTask.FRIDGE_ITEM,
      team: schemas.fridgeTask.TEAM,
      user: schemas.fridgeTask.USER,
      day: schemas.fridgeTask.DAY,
      time: schemas.fridgeTask.TIME,
      description: schemas.fridgeTask.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.fridgeTask.item.ID,
      fridgeItem: schemas.fridgeTask.FRIDGE_ITEM,
      team: schemas.fridgeTask.TEAM,
      user: schemas.fridgeTask.USER,
      day: schemas.fridgeTask.DAY,
      time: schemas.fridgeTask.TIME,
      description: schemas.fridgeTask.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.fridgeTask.ID,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.fridgeTask.LIMIT,
      from: schemas.fridgeTask.FROM,
      paginated: schemas.fridgeTask.PAGINATED,
      order: schemas.fridgeTask.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = FridgeTaskValidator;
