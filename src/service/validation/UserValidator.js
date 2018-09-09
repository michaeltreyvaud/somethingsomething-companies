const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const AuthValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.management.users.EMAIL,
      firstName: schemas.management.users.FIRST_NAME,
      lastName: schemas.management.users.LAST_NAME,
      phoneNumber: schemas.management.users.PHONE_NUMBER,
      position: schemas.management.users.POSITION,
      team: schemas.management.users.TEAM,
      authorization: schemas.management.users.AUTHORIZATION,
    });
    this.validate(params, schema);
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.management.users.EMAIL,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.management.users.EMAIL,
      firstName: schemas.management.users.FIRST_NAME,
      lastName: schemas.management.users.LAST_NAME,
      phoneNumber: schemas.management.users.PHONE_NUMBER,
      position: schemas.management.users.POSITION,
      team: schemas.management.users.TEAM,
      authorization: schemas.management.users.AUTHORIZATION,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.management.users.EMAIL,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({});
    this.validate(params, schema);
  },
};

module.exports = AuthValidator;
