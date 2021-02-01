'use strict';
import colors from 'colors';
import app from './app/app';
import config  from './app/config';
//const redis = require('./app/api/redis/redis-client');

const server = app.listen(config.port);
console.log(colors.green(`INFO::server started on port ${config.port}`));

const shutdown = function() {
  console.log(colors.yellow('WARN::************shutting down server**************'));
  //redis.quit();
  server.close();
};

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
