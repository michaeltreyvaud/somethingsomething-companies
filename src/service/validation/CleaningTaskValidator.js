const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const CleaningTaskValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.CleaningTask.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      cleaningLocation: schemas.CleaningTask.CLEANING_LOCATION,
      cleaningItem: schemas.CleaningTask.CLEANING_ITEM,
      team: schemas.CleaningTask.TEAM,
      user: schemas.CleaningTask.USER,
      day: schemas.CleaningTask.DAY,
      time: schemas.CleaningTask.TIME,
      description: schemas.CleaningTask.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      cleaningLocation: schemas.CleaningTask.CLEANING_LOCATION,
      cleaningItem: schemas.CleaningTask.CLEANING_ITEM,
      team: schemas.CleaningTask.TEAM,
      user: schemas.CleaningTask.USER,
      day: schemas.CleaningTask.DAY,
      time: schemas.CleaningTask.TIME,
      description: schemas.CleaningTask.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.CleaningTask.ID,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.CleaningTask.LIMIT,
      from: schemas.CleaningTask.FROM,
      paginated: schemas.CleaningTask.PAGINATED,
      order: schemas.CleaningTask.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = CleaningTaskValidator;
