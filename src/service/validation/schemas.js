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

const management = {
  team: {
    NAME: Joi.string().required().error(new Error('Invalid name supplied')),
    DESCRIPTION: Joi.string().required().error(new Error('Invalid description supplied')),
  },
  users: {
    EMAIL: Joi.string().email().error(new Error('Invalid email supplied')),
    FIRST_NAME: Joi.string().required().error(new Error('Invalid first name supplied')),
    LAST_NAME: Joi.string().required().error(new Error('Invalid last name supplied')),
    PHONE_NUMBER: Joi.string().required().error(new Error('Invalid phone number supplied')),
    POSITION: Joi.string().required().error(new Error('Invalid position supplied')),
    TEAM: Joi.string().required().error(new Error('Invalid team supplied')),
    AUTHORIZATION: Joi.string().required().error(new Error('Invalid authorization supplied')),
  },
};

const company = {
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

const schemas = {
  EMAIL: Joi.string().email().required().error(new Error('Invalid email supplied')),
  PASSWORD: Joi.string().required().error(new Error('Invalid password supplied')),
  SESSION: Joi.string().required().error(new Error('Invalid session supplied')),
  CONFIRMATION_CODE: Joi.string().required().error(new Error('Invalid confirmationCode supplied')),
  fridge,
  freezer,
  management,
  company,
};

module.exports = schemas;
