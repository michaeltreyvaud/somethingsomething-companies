const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  ID: Joi.string().required().error(new Error('Invalid id supplied')),
  FROM_DATE: Joi.number().required().error(new Error('Invalid from date supplied')),
  TO_DATE: Joi.number().required().error(new Error('Invalid to date supplied')),
  TRAINING_TYPE: Joi.string().required().error(new Error('Invalid training type supplied')),
  CERTIFICATION: Joi.string().uri().required().error(new Error('Invalid certification supplied')),
  DETAILS: Joi.string().error(new Error('Invalid details section supplied')),
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

const TrainingLogValidator = {
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
      fromDate: schemas.FROM_DATE,
      toDate: schemas.TO_DATE,
      trainingType: schemas.TRAINING_TYPE,
      certification: schemas.CERTIFICATION,
      details: schemas.DETAILS,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.ID,
      fromDate: schemas.FROM_DATE,
      toDate: schemas.TO_DATE,
      trainingType: schemas.TRAINING_TYPE,
      certification: schemas.CERTIFICATION,
      details: schemas.DETAILS,
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

module.exports = TrainingLogValidator;
