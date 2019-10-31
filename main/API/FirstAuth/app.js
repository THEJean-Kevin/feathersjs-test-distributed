const path = require('path');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const feathers = require('@feathersjs/feathers');
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, 'config/');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const distribution = require('@kalisio/feathers-distributed')

const authentication = require('./authentication');
const sequelize = require('./sequelize');


const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());
app.configure(distribution());
app.configure(sequelize);
app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;