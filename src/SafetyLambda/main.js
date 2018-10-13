//  eslint-disable-next-line
const AWS = require('aws-sdk');
const AwsServerlessExpress = require('aws-serverless-express');
const MainApp = require('./app');
const Logger = require('../util/logger');
const ErrorHandler = require('../util/ErrorHandler');

const DocumentClient = new AWS.DynamoDB.DocumentClient();
const createEnvironment = () => ({
  COMPANY_NAME: process.env.COMPANY_NAME,
  SAFETY_TABLE: process.env.SAFETY_TABLE,
  SAFETY_TASK_TABLE: process.env.SAFETY_TASK_TABLE,
  SAFETY_LOG_TABLE: process.env.SAFETY_LOG_TABLE,
  SAFETY_CATEGORY_TABLE: process.env.SAFETY_CATEGORY_TABLE,
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
