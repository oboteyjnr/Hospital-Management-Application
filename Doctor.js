const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Doctor first name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Doctor last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
      maxlength: [100, 'Specialization cannot exceed 100 characters'],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, 'Department is required'],
    },
    availability: {
      type: String,
      enum: ['available', 'unavailable', 'on_leave'],
      default: 'available',
    },
    contactEmail: {
      type: String,
      trim: true,
      default: '',
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    contactPhone: {
      type: String,
      trim: true,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

doctorSchema.index({ department: 1 });
doctorSchema.index({ availability: 1 });
doctorSchema.index({ isActive: 1 });

module.exports = mongoose.model('Doctor', doctorSchema);
