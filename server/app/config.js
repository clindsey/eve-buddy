export default {
  port: process.env.PORT || 8080,
  appAssetsLocation: '../../client/public',
  eve: {
    clientSecret: process.env.EVE_SECRET_KEY,
    clientID: process.env.EVE_CLIENT_ID
  },
  crypto: {
    algorithm: 'aes-256-ctr',
    password: process.env.EVE_CRYPTO_PASSWORD
  },
  database: {
    name: process.env.EVE_DATABASE_NAME,
    user: process.env.EVE_DATABASE_USER,
    password: process.env.EVE_DATABASE_PASSWORD
  }
};
