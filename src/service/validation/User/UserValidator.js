const Joi = require('joi');
const SSError = require('../../../util/SSError');

const AuthValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      email: Joi.string().email().error(new Error('Invalid email supplied')),
      firstName: Joi.string().required().error(new Error('Invalid firstName supplied')),
      lastName: Joi.string().required().error(new Error('Invalid lastName supplied')),
      phoneNumber: Joi.string().required().error(new Error('Invalid phoneNumber supplied')),
      position: Joi.string().required().error(new Error('Invalid position supplied')),
      team: Joi.string().required().error(new Error('Invalid team supplied')),
      authorization: Joi.string().required().error(new Error('Invalid authorization supplied')),
      userName: Joi.string().required().error(new Error('Invalid userName supplied')),
      signature: Joi.string().dataUri().error(new Error('Invalid signature supplied')),
    });
    this.validate(params, schema);
  },
};

module.exports = AuthValidator;
