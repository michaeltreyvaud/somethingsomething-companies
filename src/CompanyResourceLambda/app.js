const Express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
const ItemRouter = require('./routers/itemRouter');
const ProfileRouter = require('./routers/profileRouter');
const ManagementRouter = require('./routers/managementRouter');
const CompanySettingsRouter = require('./routers/companySettingsRouter');

const App = (dependencies, environment) => {
  const app = Express();
  const { ErrorHandler } = dependencies;

  app.disable('x-powered-by');
  app.use(cors());
  app.use(BodyParser.json());

  app.use('/item', ItemRouter(dependencies, environment));
  app.use('/profile', ProfileRouter(dependencies, environment));
  app.use('/management', ManagementRouter(dependencies, environment));
  app.use('/company', CompanySettingsRouter(dependencies, environment));
  app.all('*', (req, res) => res.status(404).json({ Error: 'Not Found' }));
  app.use(ErrorHandler);
  return app;
};

module.exports = App;
