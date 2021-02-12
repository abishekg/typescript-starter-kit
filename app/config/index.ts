const config = {
  port: 8090,
  appRoute: '/starter',
  skipLogging: true,
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: 'auth',
    db: 0,
  },
  appRedisSessionKey: 'apollo_app_session',
  redisKeyExpiry: 1800,
  redirectURL: 'http://localhost:8090/signin?redirect=',
    environment: 'dev'
};

export default config;
