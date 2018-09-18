class SSCognito {
  constructor(Logger, Cognito) {
    this.Logger = Logger;
    this.Cognito = Cognito;
  }

  //  Create a user as admin
  async adminCreateUser(email, opts = {}) {
    const { Logger, Cognito } = this;
    Logger.info('adminCreateUser');
    Logger.debug(`adminCreateUser with email: ${email}`);
    let params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
      ForceAliasCreation: true,
      DesiredDeliveryMediums: ['EMAIL'],
    };
    if (opts.MessageAction === 'RESEND') {
      params = {
        ...params,
        MessageAction: 'RESEND',
      };
    } else {
      const attributes = [{
        Name: 'email',
        Value: email,
      }, {
        Name: 'email_verified',
        Value: 'true',
      }];
      const additional = opts.UserAttributes || [];
      params = {
        ...params,
        UserAttributes: [...attributes, ...additional],
      };
    }
    return Cognito.adminCreateUser(params).promise();
  }

  //  Confirm a users account as admin
  async adminConfirmSignUp(userName) {
    const { Logger, Cognito } = this;
    Logger.info(`adminConfirmSignUp with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
      MessageAction: 'RESEND',
      DesiredDeliveryMediums: 'EMAIL',
    };
    return Cognito.adminConfirmSignUp(params).promise().then((_data) => {
      console.log('update me');
      return _data;
    });
  }

  //  Delete a user as admin
  async adminDeleteUser(userName) {
    const { Logger, Cognito } = this;
    Logger.info(`adminDeleteUser with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminDeleteUser(params).promise();
  }

  //  Disable a user as admin
  async adminDisableUser(userName) {
    const { Logger, Cognito } = this;
    Logger.info(`adminDisableUser with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminDisableUser(params).promise().then((_data) => {
      console.log('update me');
      return _data;
    });
  }

  //  Enable a user as admin
  async adminEnableUser(userName) {
    const { Logger, Cognito } = this;
    Logger.info(`adminEnableUser with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminEnableUser(params).promise().then((_data) => {
      console.log('update me');
      return _data;
    });
  }

  //  Gets a user as admin
  async adminGetUser(userName) {
    const { Logger, Cognito } = this;
    Logger.info(`adminGetUser with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminGetUser(params).promise();
  }

  //  TODO: Pagination?
  async listUsers() {
    const { Logger, Cognito } = this;
    Logger.info('listUsers');
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
    };
    return Cognito.listUsers(params).promise();
  }

  //  Initiates the authentication flow, as admin
  async adminInitiateAuth(email, password) {
    const { Logger, Cognito } = this;
    Logger.info(`adminInitiateAuth with email: ${email}`);
    const params = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      ClientId: process.env.APP_CLIENT_ID,
      UserPoolId: process.env.USER_POOL_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    return Cognito.adminInitiateAuth(params).promise();
  }

  //  Reset a users password as admin
  async adminResetUserPassword(userName) {
    const { Logger, Cognito } = this;
    Logger.info(`adminInitiateAuth with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminResetUserPassword(params).promise();
  }

  //  Respond to an auth challenge
  async passwordChallenge(session, email, password) {
    const { Logger, Cognito } = this;
    Logger.info(`adminRespondToAuthChallenge with email: ${email}`);
    const params = {
      ChallengeName: 'NEW_PASSWORD_REQUIRED',
      ClientId: process.env.APP_CLIENT_ID,
      UserPoolId: process.env.USER_POOL_ID,
      Session: session,
      ChallengeResponses: {
        NEW_PASSWORD: password,
        USERNAME: email,
      },
    };
    return Cognito.adminRespondToAuthChallenge(params).promise();
  }

  //  Global signout as admin
  async adminUserGlobalSignOut(userName) {
    const { Logger, Cognito } = this;
    Logger.info(`adminUserGlobalSignOut with userName: ${userName}`);
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: userName,
    };
    return Cognito.adminUserGlobalSignOut(params).promise().then((_data) => {
      console.log('update me');
      return _data;
    });
  }

  //  Update the users password
  async changePassword(accessToken, oldPassword, newPassword) {
    const { Logger, Cognito } = this;
    Logger.info(`changePassword with accessToken: ${accessToken}`);
    const params = {
      AccessToken: accessToken,
      PreviousPassword: oldPassword,
      ProposedPassword: newPassword,
    };
    return Cognito.changePassword(params).promise().then((_data) => {
      console.log('update me');
      return _data;
    });
  }

  //  Confirms a new Password
  async confirmNewPassword(email, confirmationCode, password) {
    const { Logger, Cognito } = this;
    Logger.info('confirmNewPassword');
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      ConfirmationCode: confirmationCode,
      Password: password,
      Username: email,
    };
    return Cognito.confirmForgotPassword(params).promise();
  }

  //  Confirms a user account
  async confirmSignUp(userName, confirmationCode) {
    const { Logger, Cognito } = this;
    Logger.info(`confirmSignUp with confirmationCode: ${confirmationCode} and userName: ${userName}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      ConfirmationCode: confirmationCode,
      Username: userName,
    };
    return Cognito.confirmSignUp(params).promise();
  }

  //  Deletes a user from the user pool
  async deleteUser(accessToken) {
    const { Logger, Cognito } = this;
    Logger.info(`deleteUser with accessToken: ${accessToken}`);
    const params = {
      AccessToken: accessToken,
    };
    return Cognito.deleteUser(params).promise().then((_data) => {
      console.log('update me');
      return _data;
    });
  }

  //  Create a user as admin
  async forgotPassword(email) {
    const { Logger, Cognito } = this;
    Logger.info('forgotPassword');
    Logger.debug(`forgotPassword with email: ${email}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      Username: email,
    };
    return Cognito.forgotPassword(params).promise()
      .then(data => data)
      .catch(async (_err) => {
        if (_err.code === 'NotAuthorizedException') return this.adminCreateUser(email, { MessageAction: 'RESEND' });
        throw _err;
      });
  }

  //  Get user info
  async getUser(accessToken) {
    const { Logger, Cognito } = this;
    Logger.info(`getUser with accessToken: ${accessToken}`);
    const params = {
      AccessToken: accessToken,
    };
    return Cognito.getUser(params).promise().then((_data) => {
      console.log('update me');
      return _data;
    });
  }

  //  Signs user out from all devices
  async globalSignOut(accessToken) {
    const { Logger, Cognito } = this;
    Logger.info(`globalSignOut with accessToken: ${accessToken}`);
    const params = {
      AccessToken: accessToken,
    };
    return Cognito.globalSignOut(params).promise().then((_data) => {
      console.log('update me');
      return _data;
    });
  }

  //  Register a user
  async signUp(email, password) {
    const { Logger, Cognito } = this;
    Logger.info(`signUp : ${email}`);
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      Password: password,
      Username: email,
    };
    return Cognito.signUp(params).promise();
  }

  //  Resend user confirmation code
  async resendConfirmationCode(email) {
    const { Logger, Cognito } = this;
    Logger.info('resendConfirmationCode');
    const params = {
      ClientId: process.env.APP_CLIENT_ID,
      Username: email,
    };
    return Cognito.resendConfirmationCode(params).promise();
  }

  async createGroup(name, description) {
    const { Logger, Cognito } = this;
    Logger.info('createGroup');
    Logger.debug(`createGroup with name: ${name} description: ${description}`);
    const params = {
      GroupName: name,
      UserPoolId: process.env.USER_POOL_ID,
      Description: description,
    };
    return Cognito.createGroup(params).promise();
  }

  async getGroup(name) {
    const { Logger, Cognito } = this;
    Logger.info('getGroup');
    Logger.debug(`getGroup with name: ${name}`);
    const params = {
      GroupName: name,
      UserPoolId: process.env.USER_POOL_ID,
    };
    return Cognito.getGroup(params).promise();
  }

  async updateGroup(name, description) {
    const { Logger, Cognito } = this;
    Logger.info('updateGroup');
    Logger.debug(`getGroup with name: ${name} description: ${description}`);
    const params = {
      GroupName: name,
      UserPoolId: process.env.USER_POOL_ID,
      Description: description,
    };
    return Cognito.updateGroup(params).promise();
  }

  async deleteGroup(name) {
    const { Logger, Cognito } = this;
    Logger.info('deleteGroup');
    Logger.debug(`getGroup with name: ${name}`);
    const params = {
      GroupName: name,
      UserPoolId: process.env.USER_POOL_ID,
    };
    return Cognito.deleteGroup(params).promise();
  }

  //  TODO: Pagination?
  async listGroups() {
    const { Logger, Cognito } = this;
    Logger.info('listGroups');
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
    };
    return Cognito.listGroups(params).promise();
  }

  //  TODO: Pagination?
  async listUsersInGroup(name) {
    const { Logger, Cognito } = this;
    Logger.info('listUsersInGroup');
    const params = {
      GroupName: name,
      UserPoolId: process.env.USER_POOL_ID,
    };
    return Cognito.listUsersInGroup(params).promise();
  }

  async adminAddUserToGroup(email, team) {
    const { Logger, Cognito } = this;
    Logger.info('adminAddUserToGroup');
    const params = {
      GroupName: team,
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
    };
    return Cognito.adminAddUserToGroup(params).promise();
  }
}

module.exports = SSCognito;
