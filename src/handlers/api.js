//  eslint-disable-next-line
const AWS = require('aws-sdk');
const AwsServerlessExpress = require('aws-serverless-express');
const { Validator } = require('jsonschema');
const App = require('../app');
const Utils = require('../app/Utils');

const Validation = new Validator();

const createDependencies = () => ({
  Utils,
  Validation,
});

const createApp = () => App(createDependencies());

exports.handler = (event, context) => {
  const server = AwsServerlessExpress.createServer(createApp());
  AwsServerlessExpress.proxy(server, event, context);
};
