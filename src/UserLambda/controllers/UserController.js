const UserValidator = require('../validation/UserValidator');

class UserController {
  constructor(Logger, Cognito, S3, S3Bucket) {
    this.Logger = Logger;
    this.Cognito = Cognito;
    this.Validator = UserValidator;
    this.S3 = S3;
    this.S3Bucket = S3Bucket;
    this.update = this.update.bind(this);
  }

  async update(req, res, next) {
    const {
      Logger, Cognito, Validator,
      S3, S3Bucket,
    } = this;
    const { body } = req;
    Logger.info('update');
    try {
      Validator.validateUpdateRequest(body);
      const {
        userName, firstName, lastName,
        phoneNumber, signature,
      } = body;
      //  TODO: Fix this
      const signatureKey = `users/${userName}/signature.jpeg`;
      const putParams = {
        Body: Buffer.from(signature.split(',')[1], 'base64'),
        Bucket: S3Bucket,
        Key: signatureKey,
        ContentType: 'image/jpeg',
      };
      await S3.putObject(putParams).promise();
      await Cognito.adminUpdateUserAttributes(
        userName, firstName, lastName,
        phoneNumber, signatureKey,
      );
      const updatedItems = {
        firstName, lastName, phoneNumber, signature,
      };
      return res.status(200).json(updatedItems);
    } catch (_err) {
      return next(_err);
    }
  }
}
module.exports = UserController;
