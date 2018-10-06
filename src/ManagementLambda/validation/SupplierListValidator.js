const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  ID: Joi.string().required().error(new Error('Invalid id supplied')),
  NAME: Joi.string().required().error(new Error('Invalid name supplied')),
  ADDRESS: Joi.string().error(new Error('Invalid address supplied')),
  PHONE: Joi.string().error(new Error('Invalid phone number supplied')),
  EMAIL: Joi.string().email().error(new Error('Invalid email supplied')),
  TECH_CONTACT: Joi.string().error(new Error('Invalid tech contact name supplied')),
  SALES_CONTACT: Joi.string().error(new Error('Invalid sales contact name supplied')),
  QUESTIONS: Joi.object().keys({
    q1: Joi.boolean().required().error(new Error('Invalid q1 supplied')),
    q2: Joi.boolean().required().error(new Error('Invalid q2 supplied')),
    q3: Joi.boolean().required().error(new Error('Invalid q3 supplied')),
    q4: Joi.boolean().required().error(new Error('Invalid q4 supplied')),
    q5: Joi.boolean().required().error(new Error('Invalid q5 supplied')),
    q6: Joi.boolean().required().error(new Error('Invalid q6 supplied')),
  }),
  // TO DO - Update for actual schema
  FROM: Joi.object().keys({
    company: Joi.string().required().error(new Error('Invalid company supplied')),
    id: Joi.string().required().error(new Error('Invalid id supplied')),
    name: Joi.string().required().error(new Error('Invalid name supplied')),
  }),
  LIMIT: Joi.number().error(new Error('Invalid limit supplied')),
  PAGINATED: Joi.boolean().error(new Error('Invalid paginated supplied')),
  ORDER: Joi.string().error(new Error('Invalid order supplied')),
};

const SupplierListValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.NAME,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.NAME,
      address: schemas.ADDRESS,
      phoneNo: schemas.PHONE,
      email: schemas.EMAIL,
      techContact: schemas.TECH_CONTACT,
      salesContact: schemas.SALES_CONTACT,
      questions: schemas.QUESTIONS,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.ID,
      name: schemas.NAME,
      address: schemas.ADDRESS,
      phoneNo: schemas.PHONE,
      email: schemas.EMAIL,
      techContact: schemas.TECH_CONTACT,
      salesContact: schemas.SALES_CONTACT,
      questions: schemas.QUESTIONS,
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
    const schema = Joi.object().keys({
      limit: schemas.LIMIT,
      from: schemas.FROM,
      paginated: schemas.PAGINATED,
      order: schemas.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = SupplierListValidator;
