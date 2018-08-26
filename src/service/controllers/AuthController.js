class AuthController {
  constructor(Logger, Cognito) {
    this.Logger = Logger;
    this.Cognito = Cognito;
  }

  async login(req, res) {
    const { Logger, Cognito } = this;
    const { body } = req;
    const { userName, password } = body;
    Logger.info('login');
    return Cognito.adminInitiateAuth(userName, password)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  }

  async signUp(req, res) {
    const { Logger, Cognito } = this;
    const { body } = req;
    const { userName, email, password } = body;
    Logger.info('signUp');
    return Cognito.signUp(userName, email, password)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  }

  async confirm(req, res) {
    const { Logger, Cognito } = this;
    const { body } = req;
    const { userName, confirmationCode } = body;
    Logger.info('confirm');
    return Cognito.confirmSignUp(userName, confirmationCode)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  }

  async forgot(req, res) {
    const { Logger, Cognito } = this;
    const { body } = req;
    const { userName } = body;
    Logger.info('forgot');
    return Cognito.forgotPassword(userName)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  }

  async resend(req, res) {
    const { Logger, Cognito } = this;
    const { body } = req;
    const { userName } = body;
    Logger.info('resend');
    return Cognito.resendConfirmationCode(userName)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  }

  async confirmForgotPassword(req, res) {
    const { Logger, Cognito } = this;
    const { body } = req;
    const { userName, confirmationCode, password } = body;
    Logger.info('confirmForgotPassword');
    return Cognito.confirmForgotPassword(userName, confirmationCode, password)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.code).json({
        code: err.code,
        error: err.message,
      }));
  }
}

module.exports = AuthController;
