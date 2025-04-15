const express = require('express');
const router = express.Router();
const {getAddressByUserId, addAddress, updateAddress} = require('../controllers/AddressController');

// Get user's address
router.get('/:userId', getAddressByUserId);

// Add new address
router.post('/', addAddress);

// Update address for user
router.put('/:userId', updateAddress);

module.exports = router;