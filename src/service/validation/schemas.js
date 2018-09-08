const Joi = require('joi');

const fridge = {
  item: {
    ID: Joi.string().required().error(new Error('Invalid id supplied')),
    NAME: Joi.string().required().error(new Error('Invalid name supplied')),
    DESCRIPTION: Joi.string().required().error(new Error('Invalid description supplied')),
    IMAGE: Joi.string().uri().error(new Error('Invalid image supplied')),
    FROM: Joi.object().keys({
      company: Joi.string().required().error(new Error('Invalid company supplied')),
      id: Joi.string().required().error(new Error('Invalid id supplied')),
      name: Joi.string().required().error(new Error('Invalid name supplied')),
    }),
    LIMIT: Joi.number().error(new Error('Invalid limit supplied')),
    PAGINATED: Joi.boolean().error(new Error('Invalid paginated supplied')),
    ORDER: Joi.string().error(new Error('Invalid order supplied')),
  },
};

const freezer = {
  item: {
    ID: Joi.string().required().error(new Error('Invalid id supplied')),
    NAME: Joi.string().required().error(new Error('Invalid name supplied')),
    DESCRIPTION: Joi.string().required().error(new Error('Invalid description supplied')),
    IMAGE: Joi.string().uri().error(new Error('Invalid image supplied')),
    FROM: Joi.object().keys({
      company: Joi.string().required().error(new Error('Invalid company supplied')),
      id: Joi.string().required().error(new Error('Invalid id supplied')),
      name: Joi.string().required().error(new Error('Invalid name supplied')),
    }),
    LIMIT: Joi.number().error(new Error('Invalid limit supplied')),
    PAGINATED: Joi.boolean().error(new Error('Invalid paginated supplied')),
    ORDER: Joi.string().error(new Error('Invalid order supplied')),
  },
};

const schemas = {
  EMAIL: Joi.string().email().required().error(new Error('Invalid email supplied')),
  PASSWORD: Joi.string().required().error(new Error('Invalid password supplied')),
  SESSION: Joi.string().required().error(new Error('Invalid session supplied')),
  CONFIRMATION_CODE: Joi.string().required().error(new Error('Invalid confirmationCode supplied')),
  fridge,
  freezer,
};

module.exports = schemas;
