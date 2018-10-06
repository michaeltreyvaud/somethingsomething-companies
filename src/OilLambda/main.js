//  eslint-disable-next-line
const AWS = require('aws-sdk');
const AwsServerlessExpress = require('aws-serverless-express');
const MainApp = require('./app');
const Logger = require('../util/logger');
const ErrorHandler = require('../util/ErrorHandler');

const DocumentClient = new AWS.DynamoDB.DocumentClient();
const createEnvironment = () => ({
  COMPANY_NAME: process.env.COMPANY_NAME,
  OIL_TABLE: process.env.OIL_TABLE,
  OIL_TASK_TABLE: process.env.OIL_TASK_TABLE,
  OIL_LOG_TABLE: process.env.OIL_LOG_TABLE,
});
const createDependencies = () => ({
  Logger,
  AWS,
  ErrorHandler: ErrorHandler(Logger),
  DocumentClient,
});
const createApp = () => MainApp(createDependencies(), createEnvironment());

exports.handler = (event, context) => {
  const server = AwsServerlessExpress.createServer(createApp());
  AwsServerlessExpress.proxy(server, event, context);
};
