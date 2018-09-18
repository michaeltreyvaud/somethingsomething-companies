const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const FreezerTaskValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    // const schema = Joi.object().keys({
    //   createdAt: schemas.fastCooling.CREATED_AT,
    // });
    // this.validate(params, schema);
  },
  validateCreateRequest(params) {
    // const schema = Joi.object().keys({
    //   foodItem: schemas.fastCooling.FOOD_ITEM,
    //   temperature: schemas.fastCooling.TEMPERATURE,
    //   user: schemas.fastCooling.USER,
    //   image: schemas.fastCooling.IMAGE,
    //   comments: schemas.fastCooling.COMMENTS,
    //   signature: schemas.fastCooling.SIGNATURE,
    // });
    // this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    // const schema = Joi.object().keys({
    //   id: schemas.fridge.item.ID,
    //   description: schemas.fridge.item.DESCRIPTION,
    //   name: schemas.fridge.item.NAME,
    // });
    // this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    // const schema = Joi.object().keys({
    //   createdAt: schemas.fastCooling.CREATED_AT,
    // });
    // this.validate(params, schema);
  },
  validateListRequest(params) {
    // const schema = Joi.object().keys({
    //   limit: schemas.fastCooling.LIMIT,
    //   from: schemas.fastCooling.FROM,
    //   paginated: schemas.fastCooling.PAGINATED,
    //   order: schemas.fastCooling.ORDER,
    // });
    // this.validate(params, schema);
  },
};

module.exports = FreezerTaskValidator;
