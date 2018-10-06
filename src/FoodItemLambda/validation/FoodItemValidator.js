const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  ID: Joi.string().required().error(new Error('Invalid id supplied')),
  NAME: Joi.string().required().error(new Error('Invalid name supplied')),
  BATCH_NUMBER: Joi.string().required().error(new Error('Invalid batch number supplied')),
  DESCRIPTION: Joi.string().required().error(new Error('Invalid description supplied')),
  EXPIRY_DATE: Joi.number().required().error(new Error('Invalid expiry date supplied')),
  ALLERGENS: Joi.object().keys({
    gluten: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    sesameSeeds: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    molluscs: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    fish: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    soybeans: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    peanuts: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    milk: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    sulphurDioxideAndSulphites: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    crustaceans: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    eggs: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    lupin: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    nuts: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    mustard: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
    celery: Joi.boolean().required().error(new Error('Invalid allergen supplied')),
  }),
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

const FoodItemValidator = {
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
      name: schemas.NAME,
      batchNumber: schemas.BATCH_NUMBER,
      description: schemas.DESCRIPTION,
      expiryDate: schemas.EXPIRY_DATE,
      allergens: schemas.ALLERGENS,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.ID,
      name: schemas.NAME,
      batchNumber: schemas.BATCH_NUMBER,
      description: schemas.DESCRIPTION,
      expiryDate: schemas.EXPIRY_DATE,
      allergens: schemas.ALLERGENS,
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

module.exports = FoodItemValidator;
