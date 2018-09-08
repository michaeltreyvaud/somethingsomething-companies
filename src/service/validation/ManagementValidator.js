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
    const schema = Joi.object().keys({
      name: schemas.management.team.NAME,
      description: schemas.management.team.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateDescribeTeamRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.management.team.NAME,
    });
    this.validate(params, schema);
  },
  validateUpdateTeamRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.management.team.NAME,
      description: schemas.management.team.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateDeleteTeamRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.management.team.NAME,
    });
    this.validate(params, schema);
  },
  validateListTeamRequest(params) {
    const schema = Joi.object().keys({});
    this.validate(params, schema);
  },
};

module.exports = FreezerValidator;
