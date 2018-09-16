const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const FoodItemValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.fooditem.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.fooditem.NAME,
      batchNumber: schemas.fooditem.BATCH_NUMBER,
      description: schemas.fooditem.DESCRIPTION,
      expiryDate: schemas.fooditem.EXPIRY_DATE,
      allergens: schemas.fooditem.ALLERGENS,
    });
    this.validate(params, schema);
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
    const schema = Joi.object().keys({
      createdAt: schemas.fooditem.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.fooditem.LIMIT,
      from: schemas.fooditem.FROM,
      paginated: schemas.fooditem.PAGINATED,
      order: schemas.fooditem.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = FoodItemValidator;
