const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name']
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: 3
    },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'researcher', 'emergency'],
      required: true
    },
    licenseNumber: {
      type: String,
      default: ''
    },
    organization: {
      type: String,
      default: ''
    },
    walletAddress :{
      type : String
    },

    // Forgot Password Fields
    resetOTP: {
      type: String,
      default: null
    },
    otpExpiry: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
