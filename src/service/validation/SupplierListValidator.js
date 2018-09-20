const Joi = require('joi');
const SSError = require('../../util/SSError');
const schemas = require('./schemas');

const SupplierListValidator = {
  validate(params, schema) {
    const validationResult = Joi.validate(params, schema);
    if (validationResult.error) {
      throw new SSError({ statusCode: 400, message: validationResult.error.message });
    }
  },
  validateDescribeRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.supplierList.NAME,
    });
    this.validate(params, schema);
  },
  validateCreateRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.supplierList.NAME,
      address: schemas.supplierList.ADDRESS,
      phoneNo: schemas.supplierList.PHONE,
      email: schemas.supplierList.EMAIL,
      techContact: schemas.supplierList.TECH_CONTACT,
      salesContact: schemas.supplierList.SALES_CONTACT,
      questions: schemas.supplierList.QUESTIONS,
    });
    this.validate(params, schema);
  },
  validateUpdateRequest(params) {
    const schema = Joi.object().keys({
      id: schemas.supplierList.item.ID,
      name: schemas.supplierList.NAME,
      address: schemas.supplierList.ADDRESS,
      phoneNo: schemas.supplierList.PHONE,
      email: schemas.supplierList.EMAIL,
      techContact: schemas.supplierList.TECH_CONTACT,
      salesContact: schemas.supplierList.SALES_CONTACT,
      questions: schemas.supplierList.QUESTIONS,
    });
    this.validate(params, schema);
  },
  validateDeleteRequest(params) {
    const schema = Joi.object().keys({
      name: schemas.supplierList.NAME,
    });
    this.validate(params, schema);
  },
  validateListRequest(params) {
    const schema = Joi.object().keys({
      limit: schemas.fridge.item.LIMIT,
      from: schemas.fridge.item.FROM,
      paginated: schemas.fridge.item.PAGINATED,
      order: schemas.fridge.item.ORDER,
    });
    this.validate(params, schema);
  },
};

module.exports = SupplierListValidator;
