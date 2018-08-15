const Express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
const CompanyRouter = require('./Routers/CompanyRouter');

class App {
  constructor(dependencies) {
    this.app = Express();
    this.companies = new CompanyRouter.Router(dependencies);
    const { app, companies } = this;
    app.disable('x-powered-by');
    app.use(cors());
    app.use(BodyParser.raw());
    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));

    app.use('/companies', companies.getRouter());
    app.all('*', (req, res) => res.status(404).json({ Error: 'Not Found' }));
  }

  getApp() {
    const { app } = this;
    return app;
  }
}

exports.App = App;
