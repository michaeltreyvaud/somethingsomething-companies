const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const SafetyDatasheetValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.safetyDatasheet.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
        id: schemas.safetyDatasheet.ID,
        user: schemas.safetyDatasheet.USER,
        title: schemas.safetyDatasheet.TITLE,
        file: schemas.safetyDatasheet.FILE,
        signature: schemas.safetyDatasheet.SIGNATURE,
        comments: schemas.safetyDatasheet.COMMENTS,
    });
    this.validate(params, schema);
  },


  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
        id: schemas.safetyDatasheet.ID,
        user: schemas.safetyDatasheet.USER,
        title: schemas.safetyDatasheet.TITLE,
        file: schemas.safetyDatasheet.FILE,
        signature: schemas.safetyDatasheet.SIGNATURE,
        comments: schemas.safetyDatasheet.COMMENTS,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.safetyDatasheet.id,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.safetyDatasheet.LIMIT,
      from: schemas.safetyDatasheet.FROM,
      paginated: schemas.safetyDatasheet.PAGINATED,
      order: schemas.safetyDatasheet.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = SafetyDatasheetValidator;
