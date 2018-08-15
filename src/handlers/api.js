//  eslint-disable-next-line
const AWS = require('aws-sdk');
const AwsServerlessExpress = require('aws-serverless-express');
const { Validator } = require('jsonschema');
const MainApp = require('../app');
const Utils = require('../app/Utils');
const Dynamo = require('../app/Lib/Dynamo');
const Cloudformation = require('../app/Lib/Cloudformation');

const Validation = new Validator();
const SSDynamo = new Dynamo.SSDynamo();
const SSCloudformation = new Cloudformation.SSCloudformation();
const createDependencies = () => ({
  Utils,
  Validation,
  SSDynamo,
  SSCloudformation,
});

const createApp = () => new MainApp.App(createDependencies());

exports.handler = (event, context) => {
  const server = AwsServerlessExpress.createServer(createApp());
  AwsServerlessExpress.proxy(server, event, context);
};
