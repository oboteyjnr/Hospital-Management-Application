const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5001,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital_management',
  jwtSecret: process.env.JWT_SECRET || 'development-secret-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

module.exports = config;
