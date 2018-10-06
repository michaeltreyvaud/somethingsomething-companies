const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  ID: Joi.string().required().error(new Error('Invalid id supplied')),
  FRIDGE_ITEM: {
    id: Joi.string().required().error(new Error('Invalid fridge id supplied')),
    name: Joi.string().required().error(new Error('Invalid name supplied')),
  },
  TEMPERATURE: Joi.number().required().error(new Error('Invalid temperature supplied')),
  USER: {
    EMAIL: Joi.string().email().error(new Error('Invalid email supplied')),
    FIRST_NAME: Joi.string().required().error(new Error('Invalid first name supplied')),
    LAST_NAME: Joi.string().required().error(new Error('Invalid last name supplied')),
  },
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

const FridgeLogValidator = {
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
      fridgeItem: schemas.FRIDGE_ITEM,
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
      id: schemas.item.ID,
      fridgeItem: schemas.FRIDGE_ITEM,
      temperature: schemas.TEMPERATURE,
      user: schemas.USER,
      image: schemas.IMAGE,
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

module.exports = FridgeLogValidator;
