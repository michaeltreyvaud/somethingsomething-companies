const Joi = require('joi');
const SSError = require('../../util/SSError');

const schemas = {
  ID: Joi.string().required().error(new Error('Invalid id supplied')),
  TEAM: Joi.string().required().error(new Error('Invalid team supplied')),
  USER: {
    email: Joi.string().email().error(new Error('Invalid email supplied')),
    firstName: Joi.string().required().error(new Error('Invalid first name supplied')),
    lastName: Joi.string().required().error(new Error('Invalid last name supplied')),
  },
  CATEGORY: {
    id: Joi.string().error(new Error('Invalid category id supplied')),
    name: Joi.string().required().error(new Error('Invalid category name supplied')),
  },
  TASKNAME: Joi.string().required().error(new Error('Invalid task name supplied')),
  DESCRIPTION: Joi.string().required().error(new Error('Invalid description supplied')),
  STARTDATE: Joi.number().error(new Error('Invalid date supplied')),
  DAY: Joi.string().required().error(new Error('Invalid day supplied')),
  TIME: Joi.string().required().error(new Error('Invalid time supplied')),
  ISREPEATABLE: Joi.boolean().required().error(new Error('Invalid repeatable option supplied')),
  REPEAT: {
    type: Joi.string().error(new Error('Invalid repeat type supplied')),
    interval: Joi.number().error(new Error('Invalid interval supplied')),
    day: Joi.alternatives()
      .when('type', { is: 'WEEKLY', then: Joi.string().error(new Error('Invalid repeat day supplied')) })
      .when('type', { is: 'MONTHLY', then: Joi.number().error(new Error('Invalid repeat day supplied')) }),
  },
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

const CheckListTaskValidator = {
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
      team: schemas.TEAM,
      user: schemas.USER,
      category: schemas.CATEGORY,
      taskName: schemas.TASKNAME,
      description: schemas.DESCRIPTION,
      startDate: schemas.STARTDATE,
      time: schemas.TIME,
      isRepeatable: schemas.ISREPEATABLE,
      repeat: schemas.REPEAT,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.ID,
      team: schemas.TEAM,
      user: schemas.USER,
      category: schemas.CATEGORY,
      taskName: schemas.TASKNAME,
      description: schemas.DESCRIPTION,
      startDate: schemas.STARTDATE,
      time: schemas.TIME,
      isRepeatable: schemas.ISREPEATABLE,
      repeat: schemas.REPEAT,
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

module.exports = CheckListTaskValidator;
