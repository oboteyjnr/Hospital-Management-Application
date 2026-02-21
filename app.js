const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const { notFound, globalErrorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Hospital Management API', docs: '/health', api: '/api' });
});
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Hospital Management API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
