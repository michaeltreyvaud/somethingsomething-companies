const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  USER: Joi.object().keys({
    email: Joi.string().email().error(new Error('Invalid email supplied to user')),
    firstName: Joi.string().required().error(new Error('Invalid firstName supplied to user')),
    lastName: Joi.string().required().error(new Error('Invalid lastName supplied to user')),
  }),
  ID: Joi.string().required().error(new Error('Invalid id supplied')),
  SUPPLIER: Joi.object().keys({
    ID: Joi.string().required().error(new Error('Invalid supplier id supplied')),
    NAME: Joi.string().required().error(new Error('Invalid supplier name supplied')),
  }),
  ORDER_NUMBER: Joi.string().error(new Error('Invalid order number supplied')),
  TEMPERATURE: Joi.number().required().error(new Error('Invalid temperature supplied')),
  IMAGE: Joi.string().uri().error(new Error('Invalid image supplied')),
  DELIVERY_TYPE: Joi.object().keys({
    FreshGoods: Joi.boolean().required().error(new Error('Invalid FreshGoods supplied')),
    FrozenGoods: Joi.boolean().required().error(new Error('Invalid FrozenGoods supplied')),
    DryGoods: Joi.boolean().required().error(new Error('Invalid DryGoods supplied')),
    Miscellaneous: Joi.boolean().required().error(new Error('Invalid Miscellaneous supplied')),
  }),
  EXPIRY_DATE: Joi.number().required().error(new Error('Invalid expiry date supplied')),
  CONDITIONS: Joi.object().keys({
    q1: Joi.boolean().required().error(new Error('Invalid q1 supplied')),
    q2: Joi.boolean().required().error(new Error('Invalid q2 supplied')),
    q3: Joi.boolean().required().error(new Error('Invalid q3 supplied')),
    q4: Joi.boolean().required().error(new Error('Invalid q4 supplied')),
    q5: Joi.boolean().required().error(new Error('Invalid q5 supplied')),
  }),
  SIGNATURE: Joi.string().uri().required().error(new Error('Invalid signature supplied')),
  COMMENTS: Joi.string().error(new Error('Invalid comments supplied')),
  STATUS: Joi.string().required().error(new Error('Invalid status supplied')),
  CREATED_AT: Joi.number().required().error(new Error('Invalid expiry createdAt supplied')),
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

const DeliveryItemValidator = {
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
      supplier: schemas.SUPPLIER,
      orderNumber: schemas.ORDER_NUMBER,
      temperature: schemas.TEMPERATURE,
      image: schemas.IMAGE,
      deliveryType: schemas.DELIVERY_TYPE,
      conditions: schemas.CONDITIONS,
      signature: schemas.SIGNATURE,
      comments: schemas.COMMENTS,
      status: schemas.STATUS,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.ID,
      user: schemas.USER,
      supplier: schemas.SUPPLIER,
      orderNumber: schemas.ORDER_NUMBER,
      temperature: schemas.TEMPERATURE,
      image: schemas.IMAGE,
      deliveryType: schemas.DELIVERY_TYPE,
      conditions: schemas.CONDITIONS,
      signature: schemas.SIGNATURE,
      comments: schemas.COMMENTS,
      status: schemas.STATUS,
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

module.exports = DeliveryItemValidator;
