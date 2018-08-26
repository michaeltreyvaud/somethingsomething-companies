//  eslint-disable-next-line
const AWS = require('aws-sdk');
const AwsServerlessExpress = require('aws-serverless-express');
const MainApp = require('../app');
const Utils = require('../util');
const AuthController = require('../service/controllers/AuthController');
const Logger = require('../util/logger');
const Cognito = require('../service/lib/Cognito');

const awsCognito = new AWS.CognitoIdentityServiceProvider();
const SSCognito = new Cognito(Logger, awsCognito);
const AuthApi = new AuthController(Logger, SSCognito);
const createDependencies = () => ({
  Utils,
  AuthApi,
  Logger,
});
const createApp = () => MainApp(createDependencies());

exports.handler = (event, context) => {
  const server = AwsServerlessExpress.createServer(createApp());
  AwsServerlessExpress.proxy(server, event, context);
};
