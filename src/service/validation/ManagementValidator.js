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
  validateCreateTeamRequest(params) {
    //this.validate(params, schema);
  },
  validateDescribeTeamRequest(params) {
    //this.validate(params, schema);
  },
  validateUpdateTeamRequest(params) {
    //this.validate(params, schema);
  },
  validateDeleteTeamRequest(params) {
    //this.validate(params, schema);
  },
  validateListTeamRequest(params) {
    //this.validate(params, schema);
  },
};

module.exports = FreezerValidator;
