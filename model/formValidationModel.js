const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter a valid email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long']
  }
}, {
  timestamps: true //  Automatically adds createdAt and updatedAt
});

//  Virtual field for confirmPassword (won’t be stored in DB)
userSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Pre-save hook for validation and hashing
userSchema.pre('save', async function (next) {
  if (this.password !== this._confirmPassword) {
    return next(new Error('Passwords do not match'));
  }

  // Only hash if not already hashed
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

const userModel = mongoose.model('userFormValidation', userSchema);

module.exports = {
  userModel
};
