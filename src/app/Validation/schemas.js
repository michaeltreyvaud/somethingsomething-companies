const Schemas = {
  DescribeCompany: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
    additionalProperties: false,
  },
  CreateCompany: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      phonenumber: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
    },
    required: ['name', 'email', 'phonenumber', 'firstname', 'lastname'],
    additionalProperties: false,
  },
  UpdateCompany: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      phonenumber: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
    },
    required: ['name', 'email', 'phonenumber', 'firstname', 'lastname'],
  },
  DeleteCompany: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
    additionalProperties: false,
  },
};

module.exports = Schemas;
