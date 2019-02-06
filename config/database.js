const dbssecret = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
  uri: 'mongodb://msantana:0211ms11d4@ds018258.mlab.com:18258/burguer', // Databse URI and database name
  secret: dbssecret, // Cryto-created secret
  db: 'burguer-service' // Database name
}
