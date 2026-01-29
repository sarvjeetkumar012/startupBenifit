const express = require('express');
const {
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal
} = require('../controllers/dealController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllDeals);
router.get('/:id', getDealById);

// Protected routes (admin functionality - can be extended)
router.post('/', protect, createDeal);
router.put('/:id', protect, updateDeal);
router.delete('/:id', protect, deleteDeal);

module.exports = router;
