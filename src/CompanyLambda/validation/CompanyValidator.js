const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  NAME: Joi.string().required().error(new Error('Invalid name supplied')),
  EMAIL: Joi.string().email().required().error(new Error('Invalid email supplied')),
  FIRST_NAME: Joi.string().required().error(new Error('Invalid first name supplied')),
  LAST_NAME: Joi.string().required().error(new Error('Invalid last name supplied')),
  PHONE: Joi.string().required().error(new Error('Invalid phone number supplied')),
  MOBILE: Joi.string().required().error(new Error('Invalid mobile number supplied')),
  COUNTRY: Joi.string().required().error(new Error('Invalid country supplied')),
  CITY: Joi.string().required().error(new Error('Invalid city supplied')),
  ADDRESS_1: Joi.string().required().error(new Error('Invalid address supplied')),
  ADDRESS_2: Joi.string().required().error(new Error('Invalid address supplied')),
  ADDRESS_3: Joi.string().required().error(new Error('Invalid address supplied')),
  LOGO: Joi.string().uri().required().error(new Error('Invalid logo supplied')),
};

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
      name: schemas.NAME,
      email: schemas.EMAIL,
      firstName: schemas.FIRST_NAME,
      lastName: schemas.LAST_NAME,
      phone: schemas.PHONE,
      mobile: schemas.MOBILE,
      country: schemas.COUNTRY,
      city: schemas.CITY,
      address1: schemas.ADDRESS_1,
      address2: schemas.ADDRESS_2,
      address3: schemas.ADDRESS_3,
      logo: schemas.LOGO,
    });
    this.validate(params, schema);
  },
};

module.exports = FreezerValidator;
