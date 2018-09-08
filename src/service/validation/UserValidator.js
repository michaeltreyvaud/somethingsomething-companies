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
  },
  validateDescribeRequest(params) {
  },
  validateUpdateRequest(params) {
  },
  validateDeleteRequest(params) {
  },
  validateListRequest(params) {
  },
};

module.exports = AuthValidator;
