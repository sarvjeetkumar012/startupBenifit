const Deal = require('../models/Deal');

// @desc    Get all deals with filtering and search
// @route   GET /api/deals
// @access  Public
const getAllDeals = async (req, res, next) => {
  try {
    const { category, isLocked, search, sortBy = '-createdAt', page = 1, limit = 20 } = req.query;

    // Build query
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (isLocked !== undefined) {
      query.isLocked = isLocked === 'true';
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const deals = await Deal.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(Number.parseInt(limit, 10));

    const total = await Deal.countDocuments(query);

    res.status(200).json({
      success: true,
      count: deals.length,
      total,
      page: Number.parseInt(page, 10),
      pages: Math.ceil(total / limit),
      data: deals
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single deal by ID
// @route   GET /api/deals/:id
// @access  Public
const getDealById = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    res.status(200).json({
      success: true,
      data: deal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new deal
// @route   POST /api/deals
// @access  Private (Admin)
const createDeal = async (req, res, next) => {
  try {
    const deal = await Deal.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Deal created successfully',
      data: deal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update deal
// @route   PUT /api/deals/:id
// @access  Private (Admin)
const updateDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Deal updated successfully',
      data: deal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete deal
// @route   DELETE /api/deals/:id
// @access  Private (Admin)
const deleteDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    // Soft delete - just mark as inactive
    deal.isActive = false;
    await deal.save();

    res.status(200).json({
      success: true,
      message: 'Deal deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal
};
