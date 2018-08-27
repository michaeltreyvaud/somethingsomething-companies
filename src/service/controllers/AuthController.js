class AuthController {
  constructor(Logger, Cognito) {
    this.Logger = Logger;
    this.Cognito = Cognito;
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.confirm = this.confirm.bind(this);
    this.forgot = this.forgot.bind(this);
    this.resend = this.resend.bind(this);
    this.confirmForgotPassword = this.confirmForgotPassword.bind(this);
    this.challenge = this.challenge.bind(this);
  }

  async login(req, res, next) {
    const { Logger, Cognito } = this;
    const { body } = req;
    const { email, password } = body;
    Logger.info('login');
    try {
      const response = await Cognito.adminInitiateAuth(email, password);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  async signUp(req, res, next) {
    const { Logger, Cognito } = this;
    const { body } = req;
    const { email } = body;
    Logger.info('signUp');
    try {
      const response = await Cognito.adminCreateUser(email);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }

  async confirm(req, res, next) {
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

  async forgot(req, res, next) {
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

  async resend(req, res, next) {
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

  async confirmForgotPassword(req, res, next) {
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

  async challenge(req, res, next) {
    const { Logger, Cognito } = this;
    const { body } = req;
    const { session, password, email } = body;
    Logger.info('signUp');
    try {
      const response = await Cognito.adminRespondToAuthChallenge(session, email, password);
      return res.status(200).json(response);
    } catch (_err) {
      return next(_err);
    }
  }
}

module.exports = AuthController;
