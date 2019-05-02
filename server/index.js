/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const routes = require('./routes')
const { resolve } = require('path');
const app = express();

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app)

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

});
