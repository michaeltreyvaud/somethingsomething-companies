const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const CleaningLogValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.CleaningLog.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      cleaningLocation: schemas.CleaningLog.CLEANING_LOCATION,
      cleaningItem: schemas.CleaningLog.CLEANING_ITEM,
      user: schemas.CleaningLog.USER,
      image: schemas.CleaningLog.IMAGE,
      comments: schemas.CleaningLog.COMMENTS,
      signature: schemas.CleaningLog.SIGNATURE,
      status: schemas.CleaningLog.STATUS,
    });
    this.validate(params, schema);
  },

  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      cleaningLocation: schemas.CleaningLog.CLEANING_LOCATION,
      cleaningItem: schemas.CleaningLog.CLEANING_ITEM,
      user: schemas.CleaningLog.USER,
      image: schemas.CleaningLog.IMAGE,
      comments: schemas.CleaningLog.COMMENTS,
      signature: schemas.CleaningLog.SIGNATURE,
      status: schemas.CleaningLog.STATUS,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.CleaningLog.ID,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.CleaningLog.LIMIT,
      from: schemas.CleaningLog.FROM,
      paginated: schemas.CleaningLog.PAGINATED,
      order: schemas.CleaningLog.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = CleaningLogValidator;
