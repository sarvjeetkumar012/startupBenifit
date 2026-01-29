const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Deal title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    partnerName: {
      type: String,
      required: [true, 'Partner name is required'],
      trim: true
    },
    partnerLogo: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['cloud-services', 'marketing', 'analytics', 'productivity', 'development', 'design', 'communication', 'other']
    },
    discountValue: {
      type: String,
      required: [true, 'Discount value is required'],
      trim: true
    },
    originalPrice: {
      type: String,
      default: ''
    },
    isLocked: {
      type: Boolean,
      default: false
    },
    eligibilityCriteria: {
      type: String,
      default: 'Available to all users'
    },
    requiredVerification: {
      type: Boolean,
      default: false
    },
    termsAndConditions: {
      type: String,
      default: ''
    },
    validUntil: {
      type: Date,
      default: null
    },
    claimLimit: {
      type: Number,
      default: null
    },
    currentClaims: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes for filtering and searching
dealSchema.index({ category: 1, isActive: 1 });
dealSchema.index({ isLocked: 1 });
dealSchema.index({ title: 'text', description: 'text', partnerName: 'text' });

module.exports = mongoose.model('Deal', dealSchema);
