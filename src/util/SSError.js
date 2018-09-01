module.exports = class extends Error {
  constructor({ statusCode, message }) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Object.freeze(this);
  }
};
