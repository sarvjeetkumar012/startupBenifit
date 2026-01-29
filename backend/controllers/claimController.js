const Claim = require('../models/Claim');
const Deal = require('../models/Deal');

// @desc    Claim a deal
// @route   POST /api/claims
// @access  Private
const claimDeal = async (req, res, next) => {
  try {
    const { dealId } = req.body;
    const userId = req.user._id;

    // Check if deal exists
    const deal = await Deal.findById(dealId);

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    if (!deal.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This deal is no longer active'
      });
    }

    // Check if deal is locked and user is verified
    if (deal.isLocked && !req.user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'This deal requires user verification. Please verify your account to claim this deal.'
      });
    }

    // Check if deal has reached claim limit
    if (deal.claimLimit && deal.currentClaims >= deal.claimLimit) {
      return res.status(400).json({
        success: false,
        message: 'This deal has reached its claim limit'
      });
    }

    // Check if user has already claimed this deal
    const existingClaim = await Claim.findOne({
      user: userId,
      deal: dealId
    });

    if (existingClaim) {
      return res.status(400).json({
        success: false,
        message: 'You have already claimed this deal',
        data: existingClaim
      });
    }

    // Create claim
    const claim = await Claim.create({
      user: userId,
      deal: dealId,
      status: deal.requiredVerification ? 'pending' : 'approved',
      approvedAt: deal.requiredVerification ? null : new Date()
    });

    // Increment claim counter
    deal.currentClaims += 1;
    await deal.save();

    // Populate deal information
    await claim.populate('deal');

    res.status(201).json({
      success: true,
      message: deal.requiredVerification 
        ? 'Claim submitted successfully. Awaiting approval.' 
        : 'Deal claimed successfully!',
      data: claim
    });
  } catch (error) {
    // Handle duplicate claim error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already claimed this deal'
      });
    }
    next(error);
  }
};

// @desc    Get all claims for logged in user
// @route   GET /api/claims/my-claims
// @access  Private
const getUserClaims = async (req, res, next) => {
  try {
    const claims = await Claim.find({ user: req.user._id })
      .populate('deal')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update claim status
// @route   PUT /api/claims/:id/status
// @access  Private (Admin)
const updateClaimStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const claimId = req.params.id;

    const claim = await Claim.findById(claimId);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    claim.status = status;

    if (status === 'approved') {
      claim.approvedAt = new Date();
    }

    await claim.save();

    res.status(200).json({
      success: true,
      message: 'Claim status updated successfully',
      data: claim
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  claimDeal,
  getUserClaims,
  updateClaimStatus
};
