//  eslint-disable-next-line
const AWS = require('aws-sdk');
const AwsServerlessExpress = require('aws-serverless-express');
const MainApp = require('./app');
const Logger = require('../util/logger');
const ErrorHandler = require('../util/ErrorHandler');

const createEnvironment = () => ({
  COMPANY_SETTINGS_SSM_PARAM: process.env.COMPANY_SETTINGS_SSM_PARAM,
});
const createDependencies = () => ({
  Logger,
  AWS,
  ErrorHandler: ErrorHandler(Logger),
});
const createApp = () => MainApp(createDependencies(), createEnvironment());

exports.handler = (event, context) => {
  const server = AwsServerlessExpress.createServer(createApp());
  AwsServerlessExpress.proxy(server, event, context);
};
