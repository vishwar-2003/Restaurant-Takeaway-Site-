const express = require('express');
const router = express.Router();

const {
  getAllWindows,
  createWindow,
  updateWindow,
  deleteWindow
} = require('../../controllers/admin/DeliveryWondowController');

router.get('/', getAllWindows);
router.post('/', createWindow);
router.put('/:id', updateWindow);
router.delete('/:id', deleteWindow);

module.exports = router;
