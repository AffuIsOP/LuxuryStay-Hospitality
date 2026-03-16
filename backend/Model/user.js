const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
  },
  userpassword: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  userImage: {
    type: String,
    default: null,
  },
  userRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserRole',
    required: true,
  },
  staffRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StaffRole',
    default: null,
  },
  verificationCode: { 
    type: String,
    default: null, 
  },
  verificationCodeExpiresAt: {
    type: Date,
    default: null, 
  },
  isVerified: {
    type: Boolean,
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetOtp: {
    type: String,
    default: null,
  },
  passwordResetOtpExpiresAt: {
    type: Date,
    default: null,
  },

  status: {
    type: String,
  },
});


const User = mongoose.model('User', userSchema);
module.exports = { User };
