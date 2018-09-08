const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const FreezerValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.freezer.item.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.freezer.item.NAME,
      description: schemas.freezer.item.DESCRIPTION,
      image: schemas.freezer.item.IMAGE,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.freezer.item.ID,
      description: schemas.freezer.item.DESCRIPTION,
      name: schemas.freezer.item.NAME,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.freezer.item.ID,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.freezer.item.LIMIT,
      from: schemas.freezer.item.FROM,
      paginated: schemas.freezer.item.PAGINATED,
      order: schemas.freezer.item.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = FreezerValidator;
