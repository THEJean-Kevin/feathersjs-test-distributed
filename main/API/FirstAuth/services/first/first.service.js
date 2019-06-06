// Initializes the `mail` service on path `/mail`
const createService = require('feathers-sequelize');
const createModel = require('./first.model');
const hooks = require('./first.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/first', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('first');

  service.hooks(hooks);
};