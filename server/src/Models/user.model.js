const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // User roles: normal user, hospital, or admin
  roles: [{
    type: String,
    enum: ['user', 'hospital', 'admin'],
    default: ['user']
  }],
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  // Push notification tokens for real-time alerts (Socket.IO/Web Push)
  notificationTokens: [{
    type: String
  }],
  address: {
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true }
  },
  emergencyContact: {
    name: { type: String, trim: true },
    relationship: { type: String, trim: true },
    phone: { type: String, trim: true }
  },
  medicalHistory: [{
    condition: { type: String },
    diagnosedAt: { type: Date },
    notes: { type: String }
  }],
  heightCm: { type: Number, min: 30, max: 250 },
  weightKg: { type: Number, min: 20, max: 300 },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],  // [longitude, latitude]
      index: '2dsphere'
    }
  },
  lastDonation: {
    type: Date
  },
  verified: {
    type: Boolean,
    default: false
  },
  profileImage: {
    type: String
  },
  // Track users who have donated to this user
  donatedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // Track users to whom this user has donated
  donatedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // Ratings by other users: references to User documents
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update `updatedAt`
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for quick blood type + location searches
userSchema.index({ bloodType: 1, 'location': '2dsphere' });

module.exports = mongoose.model('User', userSchema);
