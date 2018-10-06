const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  EMAIL: Joi.string().email().required().error(new Error('Invalid email supplied')),
  PASSWORD: Joi.string().required().error(new Error('Invalid password supplied')),
  SESSION: Joi.string().required().error(new Error('Invalid session supplied')),
  CONFIRMATION_CODE: Joi.string().required().error(new Error('Invalid confirmationCode supplied')),
  REFRESH_TOKEN: Joi.string().required().error(new Error('Invalid refreshToken supplied')),
};

const AuthValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateLoginRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.EMAIL,
      password: schemas.PASSWORD,
    });
    this.validate(params, schema);
  },
  validateSignupRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.EMAIL,
    });
    this.validate(params, schema);
  },
  validatePasswordChallengeRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.EMAIL,
      password: schemas.PASSWORD,
      session: schemas.SESSION,
    });
    this.validate(params, schema);
  },
  validateForgotPasswordRequest(params) {
    const schema = Joi.object().keys({
      email: schemas.EMAIL,
    });
    this.validate(params, schema);
  },
  validateConfirmForgotPassword(params) {
    const schema = Joi.object().keys({
      email: schemas.EMAIL,
      password: schemas.PASSWORD,
      confirmationCode: schemas.CONFIRMATION_CODE,
    });
    this.validate(params, schema);
  },
  validateValidateRequest(params) {
    const schema = Joi.object().keys({
      refreshToken: schemas.REFRESH_TOKEN,
    });
    this.validate(params, schema);
  },
};

module.exports = AuthValidator;
