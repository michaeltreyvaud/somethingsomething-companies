const Express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
// const CompanyRouter = require('../service/routers/CompanyRouter');
const AuthRouter = require('../service/routers/AuthRouter');
const FridgeRouter = require('../service/routers/FridgeRouter');
const FreezerRouter = require('../service/routers/FreezerRouter');
const ManagementRouter = require('../service/routers/ManagementRouter');

const App = (dependencies, environment) => {
  const app = Express();
  const { ErrorHandler } = dependencies;

  app.disable('x-powered-by');
  app.use(cors());
  app.use(BodyParser.raw());
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended: true }));

  // app.use('/company', CompanyRouter(dependencies));
  app.use('/auth', AuthRouter(dependencies, environment));
  app.use('/fridge', FridgeRouter(dependencies, environment));
  app.use('/freezer', FreezerRouter(dependencies, environment));
  app.use('/management', ManagementRouter(dependencies, environment));
  app.all('*', (req, res) => res.status(404).json({ Error: 'Not Found' }));
  app.use(ErrorHandler);
  return app;
};

module.exports = App;
