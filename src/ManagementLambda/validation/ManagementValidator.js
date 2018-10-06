const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  NAME: Joi.string().required().error(new Error('Invalid name supplied')),
  DESCRIPTION: Joi.string().required().error(new Error('Invalid description supplied')),
};

const ManagementValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.NAME,
      description: schemas.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.NAME,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.NAME,
      description: schemas.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.NAME,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({});
    this.validate(params, schema);
  },
  validateListUsersRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.NAME,
    });
    this.validate(params, schema);
  },
  validateUserDeleteRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.NAME,
      userName: schemas.NAME,
    });
    this.validate(params, schema);
  },
};

module.exports = ManagementValidator;
