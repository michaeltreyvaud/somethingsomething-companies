const jwtDecode = require('jwt-decode');
const AuthValidator = require('../validation/AuthValidator');

class AuthController {
  constructor(Logger, Cognito, S3, S3Bucket) {
    this.Logger = Logger;
    this.Cognito = Cognito;
    this.Validator = AuthValidator;
    this.S3 = S3;
    this.S3Bucket = S3Bucket;
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.forgot = this.forgot.bind(this);
    this.confirmNewPassword = this.confirmNewPassword.bind(this);
    this.challenge = this.challenge.bind(this);
    this.validate = this.validate.bind(this);
  }

  //  Attempt to log the user in
  async login(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('login');
    try {
      Validator.validateLoginRequest(body);
      const { email, password } = body;
      const response = await Cognito.adminInitiateAuth(email, password);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  //  Attempt to register a user
  async signUp(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('signUp');
    try {
      Validator.validateSignupRequest(body);
      const { email } = body;
      const response = await Cognito.adminCreateUser(email);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  //  User forgot their password
  async forgot(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('forgot');
    try {
      Validator.validateForgotPasswordRequest(body);
      const { email } = body;
      const response = await Cognito.forgotPassword(email);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  //  Confirms a new password for the user with their confirmation code
  async confirmNewPassword(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('confirmForgotPassword');
    try {
      Validator.confirmNewPassword(body);
      const { email, confirmationCode, password } = body;
      const response = await Cognito.confirmNewPassword(email, confirmationCode, password);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  //  When the user is forced to reset their password
  async challenge(req, res, next) {
    const { Logger, Cognito, Validator } = this;
    const { body } = req;
    Logger.info('challenge');
    try {
      Validator.validatePasswordChallengeRequest(body);
      const { email, password, session } = body;
      const response = await Cognito.passwordChallenge(session, email, password);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  //  Validates users tokens
  async validate(req, res, next) {
    const {
      Logger, Cognito, Validator,
      S3, S3Bucket,
    } = this;
    const { body } = req;
    Logger.info('validate');
    try {
      Validator.validateValidateRequest(body);
      const { refreshToken } = body;
      if (!refreshToken) return res.status(401).json({});
      const response = await Cognito.adminRefreshToken(refreshToken);
      const { AuthenticationResult } = response;
      if (AuthenticationResult) {
        const { IdToken } = AuthenticationResult;
        const decodedToken = jwtDecode(IdToken);
        const signatureKey = decodedToken['custom:signature'];
        if (signatureKey) {
          const params = {
            Bucket: S3Bucket,
            Key: signatureKey,
          };
          const signatureObject = await S3.getObject(params).promise();
          response.signature = `data:image/jpeg;base64,${signatureObject.Body.toString('base64')}`;
        }
      }
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = AuthController;
