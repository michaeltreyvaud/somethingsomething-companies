const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const PestManagementValidator = {
    validate(params, schema) {
        const validationResult = Joi.validate(params, schema);
        if (validationResult.error) {
          throw new SSError({ statusCode: 400, message: validationResult.error.message });
        }
      },
      validateDescribeRequest(params) {
        const schema = Joi.object().keys({
          id: schemas.pestManagement.ID,
        });
        this.validate(params, schema);
      },
      validateCreateRequest(params) {
        const schema = Joi.object().keys({
            id: schemas.pestManagement.ID,
            user: schemas.pestManagement.USER,
            title: schemas.pestManagement.TITLE,
            file: schemas.pestManagement.FILE,
            signature: schemas.pestManagement.SIGNATURE,
            comments: schemas.pestManagement.COMMENTS,
        });
        this.validate(params, schema);
      },
    
    
      validateUpdateRequest(params) {
        const schema = Joi.object().keys({
            id: schemas.pestManagement.ID,
            user: schemas.pestManagement.USER,
            title: schemas.pestManagement.TITLE,
            file: schemas.pestManagement.FILE,
            signature: schemas.pestManagement.SIGNATURE,
            comments: schemas.pestManagement.COMMENTS,
        });
        this.validate(params, schema);
      },
      validateDeleteRequest(params) {
        const schema = Joi.object().keys({
          id: schemas.pestManagement.id,
        });
        this.validate(params, schema);
      },
      validateListRequest(params) {
        const schema = Joi.object().keys({
          limit: schemas.pestManagement.LIMIT,
          from: schemas.pestManagement.FROM,
          paginated: schemas.pestManagement.PAGINATED,
          order: schemas.pestManagement.ORDER,
        });
        this.validate(params, schema);
      },
};

module.exports = PestManagementValidator;
