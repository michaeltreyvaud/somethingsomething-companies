//  eslint-disable-next-line
const AWS = require('aws-sdk');
const AwsServerlessExpress = require('aws-serverless-express');
const { Validator } = require('jsonschema');
const MainApp = require('../app');
const Utils = require('../util');
const Dynamo = require('../app/Lib/Dynamo');
const Cloudformation = require('../app/Lib/Cloudformation');
const Organizations = require('../app/Lib/Organizations');

const Validation = new Validator();
const SSDynamo = new Dynamo.SSDynamo(AWS);
const SSCloudformation = new Cloudformation.SSCloudFormation(AWS);
const SSOrganizations = new Organizations.SSOrganizations(AWS);
const createDependencies = () => ({
  Utils,
  Validation,
  SSDynamo,
  SSCloudformation,
  SSOrganizations,
});

const App = new MainApp.App(createDependencies());
const createApp = () => App.getApp();

exports.handler = (event, context) => {
  const server = AwsServerlessExpress.createServer(createApp());
  AwsServerlessExpress.proxy(server, event, context);
};
