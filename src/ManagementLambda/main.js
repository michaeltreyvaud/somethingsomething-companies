//  eslint-disable-next-line
const AWS = require('aws-sdk');
const AwsServerlessExpress = require('aws-serverless-express');
const MainApp = require('./app');
const Logger = require('../util/logger');
const Cognito = require('../service/lib/Cognito');
const ErrorHandler = require('../util/ErrorHandler');

const awsCognito = new AWS.CognitoIdentityServiceProvider();
const SSCognito = new Cognito(Logger, awsCognito);
const DocumentClient = new AWS.DynamoDB.DocumentClient();

const createEnvironment = () => ({
  COMPANY_NAME: process.env.COMPANY_NAME,
  SUPPLIER_TABLE: process.env.SUPPLIER_TABLE,
});
const createDependencies = () => ({
  Logger,
  AWS,
  ErrorHandler: ErrorHandler(Logger),
  SSCognito,
  DocumentClient,
});
const createApp = () => MainApp(createDependencies(), createEnvironment());

exports.handler = (event, context) => {
  const server = AwsServerlessExpress.createServer(createApp());
  AwsServerlessExpress.proxy(server, event, context);
};
