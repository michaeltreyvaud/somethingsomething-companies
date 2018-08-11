const Express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
const CompanyRouter = require('./Routes/company');

module.exports = (dependencies) => {
  const app = Express();

  app.disable('x-powered-by');
  app.use(cors());
  app.use(BodyParser.raw());
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended: true }));

  app.use('/companies', CompanyRouter(dependencies));

  app.all('*', (req, res) => res.status(404).json({ Error: 'Not Found' }));
  return app;
};
