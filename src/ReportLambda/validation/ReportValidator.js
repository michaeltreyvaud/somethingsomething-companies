const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  ID: Joi.string().required().error(new Error('Invalid id supplied')),
  USER: Joi.object().keys({
    email: Joi.string().email().error(new Error('Invalid email supplied to user')),
    firstName: Joi.string().required().error(new Error('Invalid firstName supplied to user')),
    lastName: Joi.string().required().error(new Error('Invalid lastName supplied to user')),
  }),
  TITLE: Joi.string().required().error(new Error('Invalid title supplied')),
  FILE: Joi.string().uri().required().error(new Error('Invalid file supplied')),
  SIGNATURE: Joi.string().uri().required().error(new Error('Invalid signature supplied')),
  COMMENTS: Joi.string().error(new Error('Invalid comments supplied')),
  CREATED_AT: Joi.number().required().error(new Error('Invalid createdAt supplied')),
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

const ReportValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      user: schemas.USER,
      title: schemas.TITLE,
      file: schemas.FILE,
      signature: schemas.SIGNATURE,
      comments: schemas.COMMENTS,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      user: schemas.USER,
      title: schemas.TITLE,
      file: schemas.FILE,
      signature: schemas.SIGNATURE,
      comments: schemas.COMMENTS,
      createdAt: schemas.CREATED_AT,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.CREATED_AT,
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

module.exports = ReportValidator;
