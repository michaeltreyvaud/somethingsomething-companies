// eslint-disable-next-line
const AWS = require('aws-sdk');

module.exports = () => {
  const cloudformation = new AWS.CloudFormation({ apiVersion: '2010-05-15' });
  const api = {
    createStack: async (_params) => {
      const params = {
        StackName: _params.StackName,
        Capabilities: _params.Capabilities,
        ClientRequestToken: _params.ClientRequestToken,
        DisableRollback: _params.DisableRollback,
        EnableTerminationProtection: _params.EnableTerminationProtection,
        NotificationARNs: _params.NotificationARNs,
        OnFailure: _params.OnFailure,
        Parameters: _params.Parameters,
        ResourceTypes: _params.ResourceTypes,
        RoleARN: _params.RoleARN,
        RollbackConfiguration: _params.RollbackConfiguration,
        StackPolicyBody: _params.StackPolicyBody,
        StackPolicyURL: _params.StackPolicyURL,
        Tags: _params.Tags,
        TemplateBody: _params.TemplateBody,
        TemplateURL: _params.TemplateURL,
        TimeoutInMinutes: _params.TimeoutInMinutes,
      };
      return cloudformation.createStack(params).promise().then((_data) => {
        console.log('Stack Created', _data);
        return _data;
      }).catch((_createErr) => {
        console.log('Error Creating Stack : ', _createErr);
        throw _createErr;
      });
    },
  };
  return api;
};
