const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  ID: Joi.string().required().error(new Error('Invalid id supplied')),
  FOOD_ITEM: Joi.object().keys({
    id: Joi.number().required().error(new Error('Invalid id supplied to foodItem')),
    displayName: Joi.string().required().error(new Error('Invalid displayName supplied to foodItem')),
  }),
  TEMPERATURE: Joi.number().required().error(new Error('Invalid temperature supplied')),
  USER: Joi.object().keys({
    email: Joi.string().email().error(new Error('Invalid email supplied to user')),
    firstName: Joi.string().required().error(new Error('Invalid firstName supplied to user')),
    lastName: Joi.string().required().error(new Error('Invalid lastName supplied to user')),
  }),
  IMAGE: Joi.string().uri().error(new Error('Invalid image supplied')),
  COMMENTS: Joi.string().error(new Error('Invalid comments supplied')),
  SIGNATURE: Joi.string().uri().required().error(new Error('Invalid signature supplied')),
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

const ServicesValidator = {
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
      foodItem: schemas.FOOD_ITEM,
      temperature: schemas.TEMPERATURE,
      user: schemas.USER,
      image: schemas.IMAGE,
      comments: schemas.COMMENTS,
      signature: schemas.SIGNATURE,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      createdAt: schemas.CREATED_AT,
      foodItem: schemas.FOOD_ITEM,
      temperature: schemas.TEMPERATURE,
      user: schemas.USER,
      comments: schemas.COMMENTS,
      signature: schemas.SIGNATURE,
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

module.exports = ServicesValidator;
