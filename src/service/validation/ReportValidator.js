const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const ReportValidator = {
    validate(params, schema) {
        const validationResult = Joi.validate(params, schema);
        if (validationResult.error) {
          throw new SSError({ statusCode: 400, message: validationResult.error.message });
        }
      },
      validateDescribeRequest(params) {
        const schema = Joi.object().keys({
          id: schemas.report.ID,
        });
        this.validate(params, schema);
      },
      validateCreateRequest(params) {
        const schema = Joi.object().keys({
            id: schemas.report.ID,
            user: schemas.report.USER,
            title: schemas.report.TITLE,
            file: schemas.report.FILE,
            signature: schemas.report.SIGNATURE,
            comments: schemas.report.COMMENTS,
        });
        this.validate(params, schema);
      },
    
    
      validateUpdateRequest(params) {
        const schema = Joi.object().keys({
            id: schemas.report.ID,
            user: schemas.report.USER,
            title: schemas.report.TITLE,
            file: schemas.report.FILE,
            signature: schemas.report.SIGNATURE,
            comments: schemas.report.COMMENTS,
        });
        this.validate(params, schema);
      },
      validateDeleteRequest(params) {
        const schema = Joi.object().keys({
          id: schemas.report.id,
        });
        this.validate(params, schema);
      },
      validateListRequest(params) {
        const schema = Joi.object().keys({
          limit: schemas.report.LIMIT,
          from: schemas.report.FROM,
          paginated: schemas.report.PAGINATED,
          order: schemas.report.ORDER,
        });
        this.validate(params, schema);
      },
};

module.exports = ReportValidator;
