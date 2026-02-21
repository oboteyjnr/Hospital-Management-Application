/**
 * Seed script to create initial admin user.
 * Run: node backend/scripts/seedAdmin.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Role = require('../src/models/Role');
const config = require('../src/config/env');

const seedAdmin = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) {
      console.error('Admin role not found. Run the server first to create roles.');
      process.exit(1);
    }
    const existing = await User.findOne({ email: 'admin@hospital.com' });
    if (existing) {
      console.log('Admin user already exists:', existing.email);
      process.exit(0);
    }
    const admin = await User.create({
      email: 'admin@hospital.com',
      password: 'admin123',
      firstName: 'System',
      lastName: 'Admin',
      role: adminRole._id,
    });
    console.log('Admin user created:', admin.email);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedAdmin();
