/**
 * Test server - uses MongoDB Memory Server (no local MongoDB needed).
 * Run: npm run test:server (from backend/) or node backend/src/server-test.js
 */
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const startTestServer = async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  process.env.PORT = process.env.PORT || 5001;
  console.log('Using in-memory MongoDB for testing');
  require('./server.js');
};

startTestServer().catch(console.error);
