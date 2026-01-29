const express = require('express');
const {
  claimDeal,
  getUserClaims,
  updateClaimStatus
} = require('../controllers/claimController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All claim routes require authentication
router.post('/', protect, claimDeal);
router.get('/my-claims', protect, getUserClaims);
router.put('/:id/status', protect, updateClaimStatus);

module.exports = router;
