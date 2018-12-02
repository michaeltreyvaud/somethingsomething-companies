const AWS = require('aws-sdk'); //  eslint-disable-line
const AwsServerlessExpress = require('aws-serverless-express');
const Logger = require('loglevel');
const MainApp = require('./app');
const Cognito = require('../lib/Cognito');
const ErrorHandler = require('../util/ErrorHandler');

const awsCognito = new AWS.CognitoIdentityServiceProvider();
const SSCognito = new Cognito(Logger, awsCognito);
const DocumentClient = new AWS.DynamoDB.DocumentClient();
const S3 = new AWS.S3();

const createEnvironment = () => ({
  COMPANY_NAME: process.env.COMPANY_NAME,
  COMPANY_ITEM_TABLE: process.env.COMPANY_ITEM_TABLE,
  COMPANY_TASK_TABLE: process.env.COMPANY_TASK_TABLE,
  COMPANY_BUCKET: process.env.COMPANY_BUCKET,
});
const createDependencies = () => ({
  Logger,
  AWS,
  ErrorHandler: ErrorHandler(Logger),
  DocumentClient,
  S3,
  SSCognito,
});
const createApp = () => MainApp(createDependencies(), createEnvironment());

exports.handler = (event, context) => {
  const server = AwsServerlessExpress.createServer(createApp());
  AwsServerlessExpress.proxy(server, event, context);
};
