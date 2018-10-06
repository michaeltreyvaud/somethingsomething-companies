const Express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
const PestManagementRouter = require('./routers/PestManagementRouter');

const App = (dependencies, environment) => {
  const app = Express();
  const { ErrorHandler } = dependencies;

  app.disable('x-powered-by');
  app.use(cors());
  app.use(BodyParser.raw());
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended: true }));

  app.use('/pest', PestManagementRouter(dependencies, environment));
  app.all('*', (req, res) => res.status(404).json({ Error: 'Not Found' }));
  app.use(ErrorHandler);
  return app;
};

module.exports = App;
