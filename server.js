const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const connectDB = require('./config/db');
const app = require('./app');
const config = require('./config/env');
const Role = require('./models/Role');
const User = require('./models/User');
const seedDepartmentsAndDoctors = require('./seed/seedData');

const startServer = async () => {
  await connectDB();
  await ensureRoles();
  await ensureAdmin();
  await seedDepartmentsAndDoctors();
  app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} on port ${config.port}`);
  });
};

const ensureRoles = async () => {
  const roles = ['admin', 'patient'];
  for (const name of roles) {
    await Role.findOneAndUpdate(
      { name },
      { name, description: `${name} role` },
      { upsert: true, new: true }
    );
  }
};

const ensureAdmin = async () => {
  const adminRole = await Role.findOne({ name: 'admin' });
  if (!adminRole) return;
  const existing = await User.findOne({ email: 'admin@hospital.com' });
  if (!existing) {
    await User.create({
      email: 'admin@hospital.com',
      password: 'admin123',
      firstName: 'System',
      lastName: 'Admin',
      role: adminRole._id,
    });
    console.log('Admin user created: admin@hospital.com');
  }
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
