const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const FridgeValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.fridge.item.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.fridge.item.NAME,
      description: schemas.fridge.item.DESCRIPTION,
      image: schemas.fridge.item.IMAGE,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    // const schema = Joi.object().keys({
    //   email: schemas.EMAIL,
    //   password: schemas.PASSWORD,
    //   session: schemas.SESSION,
    // });
    // this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.fridge.item.ID,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.fridge.item.LIMIT,
      from: schemas.fridge.item.FROM,
      paginated: schemas.fridge.item.PAGINATED,
    });
    this.validate(params, schema);
  },
};

module.exports = FridgeValidator;
