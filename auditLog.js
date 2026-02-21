const AuditLog = require('../models/AuditLog');

const createAuditLog = async (req, action, resource, resourceId = null, details = {}) => {
  try {
    await AuditLog.create({
      action,
      resource,
      resourceId: resourceId || undefined,
      performedBy: req.user?._id || null,
      details,
      ipAddress: req.ip || req.connection?.remoteAddress || '',
      userAgent: req.get('User-Agent') || '',
    });
  } catch (err) {
    console.error('Audit log error:', err.message);
  }
};

module.exports = { createAuditLog };
