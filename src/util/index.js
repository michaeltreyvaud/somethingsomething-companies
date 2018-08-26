const Utils = {
  validationError: () => {
    const error = new Error('Invalid Parameters');
    error.errorCode = 400;
    return error;
  },
  parseError: error => ({
    errorCode: (error && error.errorCode) || (error && error.statusCode) || 500,
    errorMessage: (error && error.message) || 'Internal Server Error',
  }),
};

module.exports = Utils;
