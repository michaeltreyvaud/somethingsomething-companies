const Joi = require('joi');
const SSError = require('../../../util/SSError');
const schemas = require('../schemas');

const MedicalLogValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.medicalLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      fromDate: schemas.medicalLog.FROM_DATE,
      toDate: schemas.medicalLog.TO_DATE,
      illnessType: schemas.medicalLog.ILLNESS_TYPE,
      certification: schemas.medicalLog.CERTIFICATION,
      details: schemas.medicalLog.DETAILS,
    });
    this.validate(params, schema);
  },

  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.medicalLog.ID,
      fromDate: schemas.medicalLog.FROM_DATE,
      toDate: schemas.medicalLog.TO_DATE,
      illnessType: schemas.medicalLog.ILLNESS_TYPE,
      certification: schemas.medicalLog.CERTIFICATION,
      details: schemas.medicalLog.DETAILS,
      createdAt: schemas.medicalLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.medicalLog.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.medicalLog.LIMIT,
      from: schemas.medicalLog.FROM,
      paginated: schemas.medicalLog.PAGINATED,
      order: schemas.medicalLog.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = MedicalLogValidator;
