const Joi = require('joi');
const SSError = require('../../../util/SSError');
const schemas = require('../schemas');

const TrainingLogValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.trainingLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      fromDate: schemas.trainingLog.FROM_DATE,
      toDate: schemas.trainingLog.TO_DATE,
      trainingType: schemas.trainingLog.TRAINING_TYPE,
      certification: schemas.trainingLog.CERTIFICATION,
      details: schemas.trainingLog.DETAILS,
    });
    this.validate(params, schema);
  },

  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.trainingLog.ID,
      fromDate: schemas.trainingLog.FROM_DATE,
      toDate: schemas.trainingLog.TO_DATE,
      trainingType: schemas.trainingLog.TRAINING_TYPE,
      certification: schemas.trainingLog.CERTIFICATION,
      details: schemas.trainingLog.DETAILS,
      createdAt: schemas.trainingLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.trainingLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.trainingLog.LIMIT,
      from: schemas.trainingLog.FROM,
      paginated: schemas.trainingLog.PAGINATED,
      order: schemas.trainingLog.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = TrainingLogValidator;
