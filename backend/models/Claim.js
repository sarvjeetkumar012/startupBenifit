const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    },
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deal',
      required: [true, 'Deal is required']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'expired'],
      default: 'pending'
    },
    claimCode: {
      type: String,
      unique: true,
      sparse: true
    },
    notes: {
      type: String,
      default: ''
    },
    approvedAt: {
      type: Date,
      default: null
    },
    expiresAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Compound index to prevent duplicate claims
claimSchema.index({ user: 1, deal: 1 }, { unique: true });

// Index for faster status lookups
claimSchema.index({ status: 1 });

// Generate claim code when approved
claimSchema.pre('save', function (next) {
  if (this.status === 'approved' && !this.claimCode) {
    this.claimCode = `CLAIM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model('Claim', claimSchema);
