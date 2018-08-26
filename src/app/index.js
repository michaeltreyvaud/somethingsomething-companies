const Express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
const CompanyRouter = require('../service/routers/CompanyRouter');
const AuthRouter = require('../service/routers/AuthRouter');

const App = (dependencies) => {
  const app = Express();

  app.disable('x-powered-by');
  app.use(cors());
  app.use(BodyParser.raw());
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended: true }));

  app.use('/company', CompanyRouter(dependencies));
  app.use('/auth', AuthRouter(dependencies));
  app.all('*', (req, res) => res.status(404).json({ Error: 'Not Found' }));

  return app;
};

module.exports = App;
