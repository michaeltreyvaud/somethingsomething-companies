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
    const schema = Joi.object().keys({
      id: schemas.freezerTask.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      freezerItem: schemas.freezerTask.FREEZER_ITEM,
      team: schemas.freezerTask.TEAM,
      user: schemas.freezerTask.USER,
      day: schemas.freezerTask.DAY,
      time: schemas.freezerTask.TIME,
      description: schemas.freezerTask.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.freezerTask.item.ID,
      freezerItem: schemas.freezerTask.FREEZER_ITEM,
      team: schemas.freezerTask.TEAM,
      user: schemas.freezerTask.USER,
      day: schemas.freezerTask.DAY,
      time: schemas.freezerTask.TIME,
      description: schemas.freezerTask.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.freezerTask.ID,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.freezerTask.LIMIT,
      from: schemas.freezerTask.FROM,
      paginated: schemas.freezerTask.PAGINATED,
      order: schemas.freezerTask.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = FreezerTaskValidator;
