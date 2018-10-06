const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  USER_NAME: Joi.string().required().error(new Error('Invalid userName supplied')),
  EMAIL: Joi.string().email().error(new Error('Invalid email supplied')),
  FIRST_NAME: Joi.string().required().error(new Error('Invalid first name supplied')),
  LAST_NAME: Joi.string().required().error(new Error('Invalid last name supplied')),
  PHONE_NUMBER: Joi.string().required().error(new Error('Invalid phone number supplied')),
  POSITION: Joi.string().required().error(new Error('Invalid position supplied')),
  TEAM: Joi.string().required().error(new Error('Invalid team supplied')),
  AUTHORIZATION: Joi.string().required().error(new Error('Invalid authorization supplied')),
};

const AuthValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.EMAIL,
      firstName: schemas.FIRST_NAME,
      lastName: schemas.LAST_NAME,
      phoneNumber: schemas.PHONE_NUMBER,
      position: schemas.POSITION,
      team: schemas.TEAM,
      authorization: schemas.AUTHORIZATION,
    });
    this.validate(params, schema);
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.EMAIL,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      userName: schemas.USER_NAME,
      email: schemas.EMAIL,
      firstName: schemas.FIRST_NAME,
      lastName: schemas.LAST_NAME,
      phoneNumber: schemas.PHONE_NUMBER,
      position: schemas.POSITION,
      team: schemas.TEAM,
      authorization: schemas.AUTHORIZATION,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      userName: schemas.EMAIL,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({});
    this.validate(params, schema);
  },
};

module.exports = AuthValidator;
