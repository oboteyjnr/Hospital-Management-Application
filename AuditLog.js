const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: [true, 'Audit action is required'],
      enum: ['create', 'read', 'update', 'delete', 'login', 'logout', 'register'],
      trim: true,
    },
    resource: {
      type: String,
      required: [true, 'Resource type is required'],
      enum: ['user', 'role', 'department', 'doctor', 'appointment', 'auth'],
      trim: true,
    },
    resourceId: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      default: '',
      trim: true,
    },
    userAgent: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

auditLogSchema.index({ action: 1 });
auditLogSchema.index({ resource: 1 });
auditLogSchema.index({ performedBy: 1 });
auditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
