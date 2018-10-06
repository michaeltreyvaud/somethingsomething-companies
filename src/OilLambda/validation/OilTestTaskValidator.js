const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  ID: Joi.string().required().error(new Error('Invalid id supplied')),
  OILTEST_LOCATION: {
    id: Joi.string().required().error(new Error('Invalid Oil location id supplied')),
    name: Joi.string().required().error(new Error('Invalid Oil location name supplied')),
  },
  OILTEST_ITEM: {
    id: Joi.string().required().error(new Error('Invalid Oil item id supplied')),
    name: Joi.string().required().error(new Error('Invalid Oil item name supplied')),
  },
  TEAM: {
    name: Joi.string().required().error(new Error('Invalid team name supplied')),
  },
  USER: {
    EMAIL: Joi.string().email().error(new Error('Invalid email supplied')),
    FIRST_NAME: Joi.string().required().error(new Error('Invalid first name supplied')),
    LAST_NAME: Joi.string().required().error(new Error('Invalid last name supplied')),
  },
  DAY: Joi.string().required().error(new Error('Invalid day supplied')),
  TIME: Joi.number().required().error(new Error('Invalid expiry time supplied')),
  DESCRIPTION: Joi.string().required().error(new Error('Invalid description supplied')),
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

const OilTaskValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.ID,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      oilTestLocation: schemas.OILTEST_LOCATION,
      oilTestItem: schemas.OILTEST_ITEM,
      team: schemas.TEAM,
      user: schemas.USER,
      day: schemas.DAY,
      time: schemas.TIME,
      description: schemas.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      oilTestLocation: schemas.OILTEST_LOCATION,
      oilTestItem: schemas.OILTEST_ITEM,
      team: schemas.TEAM,
      user: schemas.USER,
      day: schemas.DAY,
      time: schemas.TIME,
      description: schemas.DESCRIPTION,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.ID,
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

module.exports = OilTaskValidator;
