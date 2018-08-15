class SSOrganizations {
  constructor(AWS) {
    this.Organizations = new AWS.Organizations({ apiVersion: '2016-11-28', region: 'us-east-1' });
  }

  /**
   * createAccount - Creates an AWS Account
   *
   * @return {type}  description
   */
  async createAccount(_params) {
    const { Organizations } = this;
    const params = {
      AccountName: _params.AccountName,
      Email: _params.Email,
      IamUserAccessToBilling: _params.IamUserAccessToBilling || 'DENY',
      RoleName: _params.RoleName,
    };

    return Organizations.createAccount(params).promise().then((_data) => {
      console.log('CreateAccount Success : ', _data);
      return _data;
    }).catch((_createErr) => {
      console.log('CreateAccount Fail : ', _createErr);
      throw _createErr;
    });
  }
}

exports.SSOrganizations = SSOrganizations;
