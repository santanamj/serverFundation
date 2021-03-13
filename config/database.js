const secret = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
 // uri: 'mongodb://',  Databse URI and database name
  secret: secret, // Cryto-created secret
  db: 'fundation' // Database name
}
