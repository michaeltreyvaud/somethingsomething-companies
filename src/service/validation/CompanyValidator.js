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
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({});
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.company.NAME,
      email: schemas.company.EMAIL,
      firstName: schemas.company.FIRST_NAME,
      lastName: schemas.company.LAST_NAME,
      phone: schemas.company.PHONE,
      mobile: schemas.company.MOBILE,
      country: schemas.company.COUNTRY,
      city: schemas.company.CITY,
      address1: schemas.company.ADDRESS_1,
      address2: schemas.company.ADDRESS_2,
      address3: schemas.company.ADDRESS_3,
      logo: schemas.company.LOGO,
    });
    this.validate(params, schema);
  },
};

module.exports = FreezerValidator;
